# Mülakat Çalışma Notları — Görev 1 + Görev 2

> **DİKKAT:** Bu dosya sadece kişisel çalışma notu. Submission'a göndermeden
> önce sil veya `.gitignore`'a ekle. Dosya adı `_` ile başlıyor ki proje
> dosyalarından ayırt edilsin.

---

## 1. Bug Tam Olarak Neydi?

`src/lib/conflicts.ts` içindeki `findConflicts` fonksiyonunda **iki ayrı
bug** vardı:

### Bug 1 — Closed-closed interval semantics

**Eski kod:**
```ts
lte(flights.blockStart, q.blockEnd),   // existingStart <= proposedEnd
gte(flights.blockEnd, q.blockStart),   // existingEnd   >= proposedStart
```

**Sorun:** Domain kuralı 1 yarı-açık aralık `[start, end)` der. `lte`/`gte`
kullanmak kapalı-kapalı `[start, end]` mantığı oluşturuyordu. Sonuç:
`10:00–11:00` ve `11:00–12:00` çakışıyor sayılıyordu, oysa `T=11:00`
anında stand fiziksel olarak boş.

**Düzeltme:** `lt`/`gt` (strict inequality) kullanmak.
```ts
lt(flightsActive.blockStart, q.blockEnd),
gt(flightsActive.blockEnd, q.blockStart),
```

### Bug 2 — Soft-deleted rows döndürülüyordu

**Eski kod:** `from(flights)` doğrudan tabloyu sorguluyordu.

**Sorun:** Domain kuralı 4 silinmiş uçuşların görmezden gelinmesi gerektiğini söyler. Sorguda `deletedAt IS NULL` filtresi yoktu.

**Düzeltme:** `from(flightsActive)` view'ine geçtik. View tanımı:
```sql
CREATE VIEW flights_active AS SELECT * FROM flights WHERE deleted_at IS NULL;
```

---

## 2. Neden Inline `isNull` Yerine View Tercih Ettik?

Bu mülakatta kesin gelecek bir soru. Hazır cevap:

> "Schema zaten `flights_active` view'ini tanımlıyor ve hem schema yorumu
> hem `init.sql` yorumu hem de GLOSSARY açıkça 'manuel filtreleme yerine bu
> view'i kullanın' diyor. Inline `isNull(flights.deletedAt)` kullansaydım,
> view'in var olma sebebi olan mantığı çoğaltmış olurdum. Eğer ileride
> soft-delete tanımı genişlerse (örneğin archive flag eklenirse), view'i
> tek yerde güncellemek yeter. Inline yaklaşımda bunu unutan her callsite
> bug üretir."

**Karşı argümana hazırlık:** "Ama daha basit değil mi?"

> "Satır sayısı olarak inline biraz daha kısa, evet. Ama 'restraint'
> dediğimiz şey **mevcut altyapıyı kullanmamak değil, gereksiz yenisini
> eklememek**. View zaten var; kullanmak restraint'in kendisi."

---

## 3. `db:push` View Oluşturmama Sorunu

**Bu önemli — mülakatta puan kazandırır.** Setup sırasında keşfettiğim
bir sorun:

- README `bun run db:push` çalıştırın diyor
- `db:push` drizzle-kit'in introspection-based migration aracı, **view'leri pushlamıyor**
- Schema'da view tanımlı ama Postgres'te yoktu
- `from(flightsActive)` çağrıları "relation flights_active does not exist" hatası veriyordu
- Manuel olarak view'i oluşturmak gerekti:
  ```bash
  docker exec -i aerocity-pg psql -U aerocity -d aerocity_dev \
    -c "CREATE OR REPLACE VIEW flights_active AS SELECT * FROM flights WHERE deleted_at IS NULL;"
  ```

**Mülakatta nasıl anlatırım:**
> "Setup sırasında bir kurulum boşluğu fark ettim — `drizzle-kit push`
> view'leri oluşturmuyor (bilinen bir kısıtlama). `init.sql` dosyası tüm
> şemayı içeriyor ama drizzle config'inde migration olarak çalıştırılmıyor.
> Üretimde bu, ya `psql -f drizzle/0000_init.sql` setup adımı eklemekle
> ya da migration meta journal'ı düzgün kurarak çözülürdü."

---

## 4. Tahmin Edilen Mülakat Soruları ve Cevaplar

### S1: "Half-open interval'ı niye seçmişler?"

**C:** İki sebep:
1. **Reel dünyaya uyuyor:** Bir uçak T'de pushback yapınca, T anında
   stand fiziksel olarak boşalır. Sonraki uçak T'de block-in yapabilir.
2. **Aritmetik temiz:** Yarı-açık aralıklarda **toplama özelliği** var.
   `[10, 11) + [11, 12) = [10, 12)`. Kapalı aralıklarda `[10, 11] ∪ [11, 12]`
   diye bakarsan T=11 iki kümede de — bu mantık hatasına yol açar.
3. **Veritabanı sorgularında sade:** Strict inequality (`<`, `>`) overlap
   testi tek bir mantık kullanır; sınır eşitliği özel case'i yok.

### S2: "5 dakika gap istense ne yaparsın?"

**C:** `DECISIONS.md`'deki cevabımdaki yaklaşımı kullanırım — proposed
window'u her iki yandan 5 dakika genişletip aynı strict-inequality overlap
testini yaparım. Strict inequality'i koruduğum için `GAP_MIN = 0` durumu
mevcut back-to-back davranışına dönüyor — yani regression yok.

```ts
const GAP_MIN = 5;
const start = new Date(q.blockStart.getTime() - GAP_MIN * 60_000);
const end   = new Date(q.blockEnd.getTime()   + GAP_MIN * 60_000);
lt(flightsActive.blockStart, end);
gt(flightsActive.blockEnd, start);
```

Alternatif: gap'i mevcut uçuşların aralığına ekle (`existingEnd + 5min`).
İkisi matematiksel olarak eşdeğer ama proposed window'u genişletmek daha
sezgisel — "bu uçuşun etrafında 5 dakikalık tampon istiyorum" diyor.

### S3: "Niye `lte`'yi `lt`'ye çevirdin, başka yerde de aynı bug var mı?"

**C:** `findConflicts` çakışma tespitinin tek yeri olduğu için tek bir
yerde değişiklik yetti. Codebase'de `flights.blockStart`/`blockEnd`
karşılaştırması yapan başka yer aradım, bulamadım. Eğer endpoint'i
implemente ederken (Görev 2) yeniden overlap mantığı yazmam gerekirse,
`findConflicts`'i çağırırım — duplicate etmem.

### S4: "View kullanmak performans açısından nasıl?"

**C:** Bu view basit bir filtered SELECT, materialized değil. Postgres
query planner view'i inline expand ediyor — yani fiziksel olarak
`from(flights) where deleted_at is null` yazmaktan farkı yok. Index
açısından da `flights_deleted_at_idx` zaten mevcut. Performans nötr.

### S5: "Test'in hangi davranışı yakaladığını söyle"

**C:** İki test var:
1. `does not flag back-to-back flights as conflicting` — 11:00'de biten
   ve 11:00'de başlayan uçuşların çakışmadığını doğruluyor. Half-open
   semantic'in tam test'i.
2. `does not return soft-deleted flights (domain rule 4)` — `deletedAt`
   set edilmiş bir satırın query sonucundan dışlandığını doğruluyor.

Her ikisi de "behavior under the boundary" testleri — sınır koşullarını
test ediyorlar, ki bug'lar genelde oralarda saklanır.

### S6: "Eğer uçak block-in yaptıktan sonra block-out 'unset' kalırsa ne olur?"

**C:** Schema'da `blockEnd` not-null. Eğer business böyle bir state
istiyorsa (gerçek dünyada uçak henüz pushback yapmamışsa), schema'yı
nullable yapıp `coalesce(blockEnd, 'infinity'::timestamp)` ile sorgulanır.
Şu anki kapsamda bu case yok.

### S7: "Drizzle yerine raw SQL yazsan daha iyi olmaz mıydı?"

**C:** Bu sorgu kadar basit bir şey için Drizzle'ın query builder'ı yeterli
ve type-safe. Raw SQL'e ihtiyaç duyduğum kısımlar genelde:
- Window function'lar
- CTE-heavy analiz sorguları
- Locking (FOR UPDATE) — ki Görev 2'deki concurrency sorusu için
  düşünülmesi gereken bir şey.

`findConflicts` için Drizzle uygun.

---

## 5. Görev 2 — `POST /flights/check-allocation`

### 5.1 Ne Yapıldı

[src/lib/conflicts.ts](src/lib/conflicts.ts) içine iki yeni şey:
- `resolveMarsGroup(db, standId)` — MARS dışlama setini hesaplıyor
- `findAllocationConflicts(db, q)` — flights + unavailabilities paralel sorgu

[src/routes/flights.ts](src/routes/flights.ts) içinde stub değiştirildi:
- Zod ile body validation (`standId`, `blockStart`, `blockEnd`, `excludeFlightId?`)
- `blockEnd > blockStart` kontrolü → 400
- Response: `{ flightConflicts, unavailabilities }` ayrı serializer'larla

[__tests__/check-allocation.test.ts](__tests__/check-allocation.test.ts) — 14 odaklı test, her biri tek bir domain kuralını sınıyor.

### 5.2 Mimari Karar — `findConflicts` vs `findAllocationConflicts`

**Karar:** `findConflicts`'i mevcut haliyle (single-stand, MARS yok)
bıraktım, yeni endpoint için `findAllocationConflicts` ekledim.

**Niye:**
- `POST /flights` zaten `findConflicts`'i kullanıyor; davranışını
  değiştirmek scope creep olurdu (README sadece check-allocation'ı istiyor)
- `findConflicts` artık bir **primitive** — yeni helper bunu çağırmıyor
  ama aynı half-open + active-view kontratını paylaşıyor
- Yeni endpoint'in semantiği daha geniş (MARS + unavailability + 2 farklı
  response field'ı), ayrı bir fonksiyon olması mantıklı

**Trade-off (mülakatta gelirse):**
> "POST /flights MARS'ı respect etmiyor — yani biri direkt o endpoint'i
> kullanıp wide-body'yi A1'e koysa, A1L'de narrow-body olsa bile yazma
> başarılı olur. Bu mevcut bir bug. Görev 2 kapsamında değil ama kesinlikle
> takip eden bir issue olmalı. Concurrency sorusunun (Q4) çözümü olan
> exclusion constraint + advisory lock bu bug'ı da kapatır."

### 5.3 MARS — Dikkat Edilmesi Gereken Asimetri

**İlk implementasyonum yanlıştı.** Tüm grubu mutually-exclusive saymıştım:
parent + tüm children, hangisi sorulursa sorulsun. Sibling testi yakaladı.

**Doğrusu:**
```
Sorulan ↓ / Dolu olan →   parent   childA    childB
parent (CMA1)               ✗         ✗         ✗
child  (CMA1L)              ✗         ✗         ✓ FREE
child  (CMA1R)              ✗         ✓ FREE    ✗
```

Sadece **parent ↔ child** mutually exclusive. Sibling↔sibling bağımsız.
GLOSSARY'deki "Configuration 2 — TWO narrow-bodies use the child stands"
görseli zaten bunu gösteriyordu, README de "parent and any of its
sub-stands" diyor — siblingler hakkında bir şey demiyor.

**Mülakatta hikaye olarak:**
> "MARS'ı önce naively tüm grup mutually-exclusive olarak yazdım. Sibling
> testini yazınca yakaladım — README'yi tekrar okudum, MARS'ın asıl amacının
> kapasiteyi flex etmek olduğunu hatırladım. İki narrow-body iki child'da
> yan yana legal — bu MARS'ın varlık sebebi. `resolveMarsGroup`'u
> asimetrik yaptım: parent isteyen self+children alır, child isteyen
> self+parent alır."

### 5.4 Tahmin Edilen Mülakat Soruları (Görev 2)

#### S8: "Niye `findConflicts`'i extend etmedin de yeni fonksiyon yazdın?"

**C:** Üç sebep:
1. `findConflicts` `POST /flights` tarafından kullanılıyor — değiştirsem
   o endpoint'in davranışı da değişirdi, scope dışı.
2. `findConflicts` ismi ve dönüş tipi (`Flight[]`) tek bir şeye söz
   veriyor: aynı stand'deki çakışan uçuşlar. Yeni gereksinim daha geniş
   (MARS + unavailability + 2 ayrı kategori). Aynı isim altında
   genişletmek API'yi bulanıklaştırırdı.
3. Yeni helper hâlâ `findConflicts`'in kontratını koruyor — ikisi de
   `flightsActive`'den okur, half-open kullanır. Sadece scope farklı.

#### S9: "Çift sorgu yerine tek query'de UNION yapsan?"

**C:** Tek query mümkündü ama şunlardan vazgeçerdim:
- **Type safety:** Drizzle iki ayrı tablodan farklı satır şekilleri
  döndürüyor. UNION ALL için bir `kind` discriminator + null padding
  gerekirdi, sonra TypeScript'te demux ederdim. Net karmaşa.
- **Index kullanımı:** İki ayrı sorgu kendi index'ini hedefliyor —
  `flights_stand_block_idx` ve `stand_unavailability_stand_window_idx`.
  UNION'da planner'ın aynı yolu seçeceğinin garantisi yok.
- **Performans gereksiz:** İkisi de küçük, indeksli, paralel.
  `Promise.all` ile single round-trip değil ama iki paralel — pratikte
  fark yok.

#### S10: "MARS group resolution N+1 query gibi görünüyor"

**C:** Tek bir extra query — `resolveMarsGroup` 1 SELECT yapıyor (parent
ID'sini çekmek için), sonra 1 SELECT daha (group üyeleri için). Yani N
değil 2. Hot path'te kalsa bile cache'lenebilir (stands tablosu büyümez,
MARS yapısı statik). Şu anki ölçekte (30 ops user @ peak) gerek yok.

#### S11: "Why two queries (`flights` + `stand_unavailability`) instead of one combined source?"

**C:** Domain tipleri farklı — uçuşun `aircraftId`, `flightNumber` gibi
alanları var; unavailability'nin `reason` alanı var. README de zaten
response'u ayrı field'larla istemiş (`flightConflicts` ve
`unavailabilities`). UI bunları farklı render edecek (uçuş kartı vs
kapatma rozeti). Aynı array'de karıştırmak frontend'e işkence.

#### S12: "excludeFlightId niye var?"

**C:** Mevcut bir uçuşu UPDATE ederken — örn. saat değişikliği — kendi
satırını "çakışma" olarak görmesin diye. Olmasa, in-place güncelleme
olamaz; her seferinde delete + create gerekirdi. Bu da soft-delete
zincirini bozuyor.

#### S13: "Stand yoksa ne olur? `standId: 'NONEXISTENT'` gönderilse?"

**C:** `resolveMarsGroup` 1 SELECT yapıp boş döner, fallback olarak
`[standId]` döner. `inArray(...)` boş arrayle çalışır, sonuç
`{ flightConflicts: [], unavailabilities: [] }`. Yani "çakışma yok"
diyor, ki teknik olarak doğru — olmayan bir stand'de gerçekten çakışma
olamaz. Caller `POST /flights` yapmaya çalışınca FK constraint hatası
alır. İdeal değil; gerçek üretimde 404 döndürmek daha net olur, ama
kapsam dışı tuttum çünkü README sormamış ve testlerin gereksiz
büyümesini istemedim.

#### S14: "Concurrency için neden inline fix yazmadın?"

**C:** README açıkça "you don't have to wire it in" diyor — sketch yeter.
Ayrıca exclusion constraint için `btree_gist` extension lazım, bu
schema değişikliği. Migration olmadan eklemeye çalışsam test setup
karışırdı. Skecth + DECISIONS.md'de açıklama daha temiz.

---

## 6. Önemli Sürtüşmeler / Ek Notlar

### 6.1 `parseIsoToUtc` aslında broken

[src/lib/time.ts](src/lib/time.ts):
```ts
export function parseIsoToUtc(input: string): Date {
  return new Date(input);
}
```

Bu sadece input'ta offset varsa (`Z` veya `+08:00`) doğru çalışır.
Naive string gelirse (`"2026-05-04T08:00:00"`), JavaScript runtime
machine'in local TZ'sini kullanır — server US'teyse 8 saat kayar.

Tests `.toISOString()` kullandığı için her zaman Z'li gönderiyor —
bu yüzden bug görünmez. Production'da gerçek client farklı.

DECISIONS.md Q3'te bunu açıkladım. Düzeltmedim çünkü kapsamı genişletir
ve mevcut testleri bozma riski var.

### 6.2 `db:push` view yine oluşturmuyor

Görev 2'de yeni bir bilgi yok — view zaten Görev 1'de manuel olarak
oluşturuldu. Yeni testler de aynı view'i kullanıyor.

### 6.3 POST /flights MARS'ı respect etmiyor (bilinen, kapsamamış)

Yukarıda 5.2'de yazdım. Bunu mülakatta önceden açmaya değer:
> "Şunu fark ettim ama düzeltmedim çünkü kapsamım sadece check-allocation'dı.
> Concurrency çözümünün (exclusion constraint + advisory lock) zaten bu
> sorunu da çözeceğini düşünüyorum, çünkü write path'i MARS-aware hale
> getiriyor."

### 6.4 `GET /stands/:id/utilization` soft-deleted uçuşları sayıyor

[src/routes/stands.ts:28](src/routes/stands.ts#L28) — sorgu doğrudan
`flights` tablosundan okuyor, `flightsActive` view'inden değil. Yani
soft-delete edilmiş bir uçuş hâlâ utilization hesabına dahil oluyor.

**Domain rule 4'ün başka bir ihlali**, sadece `findConflicts`'teki
kadar göze batmıyor çünkü:
- Endpoint salt-okunur, yazma kararı vermiyor
- Mevcut test (stands.test.ts) tek bir non-deleted uçuşu test ediyor,
  edge case'i yakalamıyor

**Düzeltme tek satır:** `from(flights)` → `from(flightsActive)`. Yapmadım
çünkü kullanıcı kapsam dışı tutmamı istedi.

**Mülakatta proaktif söyle (puan kazandırır):**
> "Audit ederken `stands.ts/utilization` endpoint'inin de aynı soft-delete
> bug'ına sahip olduğunu fark ettim — `flightsActive` view'i yerine ham
> `flights` tablosundan okuyor. Tek satırlık fix ama Görev 2 kapsamım
> dışıydı, o yüzden dokunmadım. Aynı türden bir bug, aynı çözüm — view
> her okuma yolunda kullanılmalı, çünkü domain rule 4 'tüm kod yolları
> için' geçerli, sadece conflict detection için değil."

**S15: "Audit yaptın mı, başka bir bug fark ettin mi?"** sorusunun
cevabı bu — proaktif söylersen mülakatçı sormadan kazanırsın.

### 6.5 Sibling unavailability izolasyon testi yok

Test ettim:
- ✅ A1L'deki closure → A1 (parent) sorgusunda görünür
- ❌ A1L'deki closure → A1R (sibling) sorgusunda **görünmemeli** — testi yok

Kod doğru çünkü `resolveMarsGroup` aynı asimetrik fonksiyon — sibling
kontrolü flights için var, unavailability'de aynı path. Defansif test
eklemek 3 satır ama README "targeted tests beat exhaustive" diyor,
bilinçli olarak eklemedim.

**Mülakatta gelirse:**
> "Same `resolveMarsGroup` flights için de unavailability için de
> kullanılıyor — flight-sibling testi geçtiği için unavailability-sibling
> de doğal olarak doğru. Targeted-test prensibiyle ayrıca eklemedim,
> ama defansif olarak eklenebilirdi."

---

## 7. Teslim Önce Checklist (Güncel)

- [ ] `_INTERVIEW_NOTES.md` (bu dosya) **silinecek** veya `.gitignore`'a eklenecek
- [ ] `DECISIONS.md` 4 sorunun da cevaplandığından emin ol ✅ (4'ü de dolu)
- [ ] `bun run test` **24/24** geçiyor mu
- [ ] `bun run lint` ve `bun run type-check` clean mi
- [ ] `node_modules/` zip'e dahil değil
- [ ] `drizzle/0000_init.sql`'in manuel çalıştırıldığı setup notunu README'ye eklemek istersen — opsiyonel
