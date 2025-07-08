# Database - Student Management System

This directory contains the database schema and seed data for the Student Management System. The system uses PostgreSQL as the primary database with a comprehensive schema designed for educational institution management.

## 🗄️ Database Overview

### Technology
- **Database**: PostgreSQL (v12 or higher)
- **Schema**: Relational database with foreign key constraints
- **Features**: Role-based access control, audit trails, data integrity

### Files
- `tables.sql` - Complete database schema with tables, functions, and constraints
- `seed-db.sql` - Initial data for system setup and testing

## 🚀 Quick Setup

### Prerequisites
- PostgreSQL installed and running
- Database user with CREATE privileges
- psql command-line tool

### Database Setup
```bash
# Create database
createdb school_mgmt

# Run schema creation
psql -d school_mgmt -f tables.sql

# Load seed data
psql -d school_mgmt -f seed-db.sql

# Verify setup
psql -d school_mgmt -c "SELECT COUNT(*) FROM users;"
```

### Alternative Setup (with custom database name)
```bash
# Create custom database
createdb my_school_db

# Run with custom database
psql -d my_school_db -f tables.sql
psql -d my_school_db -f seed-db.sql
```

## 📊 Database Schema

### Core Tables

#### Users & Authentication
- **users** - User accounts and basic information
- **user_profiles** - Extended user profile data
- **user_refresh_tokens** - JWT refresh token storage
- **roles** - System roles (Admin, Student, Teacher, etc.)
- **permissions** - Role-permission mappings
- **access_controls** - Permission definitions

#### Academic Structure
- **classes** - Academic classes (Grade 1, Grade 2, etc.)
- **sections** - Class sections (A, B, C, etc.)
- **departments** - Organizational departments
- **class_teachers** - Teacher-class assignments

#### Leave Management
- **leave_policies** - Leave policy definitions
- **leave_status** - Leave request statuses
- **user_leaves** - Leave requests and approvals
- **user_leave_policy** - User-policy associations

#### Communication
- **notices** - System notices and announcements
- **notice_status** - Notice approval statuses
- **notice_recipient_types** - Notice distribution rules

### Key Relationships

```sql
-- User hierarchy
users (1) → (1) user_profiles
users (n) → (1) roles
users (n) → (1) leave_policies

-- Academic structure
user_profiles (n) → (1) classes
user_profiles (n) → (1) sections
user_profiles (n) → (1) departments

-- Leave system
user_leaves (n) → (1) users
user_leaves (n) → (1) leave_policies
user_leaves (n) → (1) leave_status

-- Notice system
notices (n) → (1) users (author)
notices (n) → (1) notice_status
```

## 👥 Default Roles & Permissions

### Predefined Roles
1. **Admin** - Full system access
2. **Student** - Limited access to personal data
3. **Teacher** - Access to class and student management

### Permission System
- **Hierarchical permissions** - Based on access control paths
- **Method-based access** - GET, POST, PUT, DELETE permissions
- **Role-based filtering** - Dynamic permission assignment

## 📝 Seed Data

### Default Admin Account
```
Email: admin@school-admin.com
Password: 3OU4zn3q6Zh9
Role: Admin
```

### Sample Data Includes
- **Users**: Admin, sample teachers, and students
- **Classes**: Grade 1-12 with sections
- **Departments**: Academic departments
- **Leave Policies**: Standard leave types
- **Notices**: Sample announcements
- **Permissions**: Complete access control setup

## 🔧 Database Functions

### Custom Functions
The schema includes several PostgreSQL functions for complex operations:

#### staff_add_update(JSONB)
Handles staff member creation and updates with profile management.

```sql
-- Usage example
SELECT staff_add_update('{
  "operationType": "add",
  "name": "John Teacher",
  "email": "john@school.com",
  "role": 2,
  "department": 1
}'::jsonb);
```

### Triggers & Constraints
- **Audit trails** - Automatic timestamp updates
- **Data integrity** - Foreign key constraints
- **Validation** - Check constraints for data quality

## 🔍 Common Queries

### User Management
```sql
-- Get all active users with roles
SELECT u.id, u.name, u.email, r.name as role_name
FROM users u
JOIN roles r ON u.role_id = r.id
WHERE u.is_active = true;

-- Get students by class
SELECT u.name, up.roll, up.class_name, up.section_name
FROM users u
JOIN user_profiles up ON u.id = up.user_id
JOIN roles r ON u.role_id = r.id
WHERE r.name = 'Student' AND up.class_name = 'Grade 10';
```

### Leave Management
```sql
-- Get pending leave requests
SELECT ul.id, u.name, ul.from_dt, ul.to_dt, ul.note
FROM user_leaves ul
JOIN users u ON ul.user_id = u.id
JOIN leave_status ls ON ul.status = ls.id
WHERE ls.name = 'Pending';

-- Leave statistics by user
SELECT u.name, COUNT(ul.id) as total_leaves,
       SUM(ul.to_dt - ul.from_dt + 1) as total_days
FROM users u
LEFT JOIN user_leaves ul ON u.id = ul.user_id
GROUP BY u.id, u.name;
```

### Notice Management
```sql
-- Get published notices
SELECT n.title, n.description, u.name as author, n.created_dt
FROM notices n
JOIN users u ON n.author_id = u.id
JOIN notice_status ns ON n.status = ns.id
WHERE ns.alias = 'published'
ORDER BY n.created_dt DESC;
```

## 🛠️ Maintenance

### Backup & Restore
```bash
# Create backup
pg_dump school_mgmt > backup_$(date +%Y%m%d).sql

# Restore from backup
psql -d school_mgmt < backup_20240101.sql
```

### Performance Optimization
```sql
-- Add indexes for common queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_profiles_class ON user_profiles(class_name);
CREATE INDEX idx_notices_status ON notices(status);
CREATE INDEX idx_user_leaves_user_id ON user_leaves(user_id);

-- Analyze table statistics
ANALYZE users;
ANALYZE user_profiles;
ANALYZE notices;
```

### Data Cleanup
```sql
-- Remove old refresh tokens
DELETE FROM user_refresh_tokens 
WHERE expires_at < NOW() - INTERVAL '1 day';

-- Archive old notices
UPDATE notices 
SET status = (SELECT id FROM notice_status WHERE alias = 'archived')
WHERE created_dt < NOW() - INTERVAL '1 year';
```

## 🔐 Security Considerations

### Data Protection
- **Password hashing** - Passwords stored using Argon2
- **Token security** - Refresh tokens with expiration
- **Role isolation** - Strict permission boundaries

### Access Control
```sql
-- Create read-only user for reporting
CREATE USER report_user WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE school_mgmt TO report_user;
GRANT USAGE ON SCHEMA public TO report_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO report_user;
```

## 📈 Monitoring & Analytics

### Useful Monitoring Queries
```sql
-- Active user count by role
SELECT r.name, COUNT(u.id) as user_count
FROM roles r
LEFT JOIN users u ON r.id = u.role_id AND u.is_active = true
GROUP BY r.id, r.name;

-- Database size information
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## 🐛 Troubleshooting

### Common Issues

#### Connection Issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test connection
psql -h localhost -U postgres -d school_mgmt
```

#### Permission Errors
```sql
-- Grant necessary permissions
GRANT ALL PRIVILEGES ON DATABASE school_mgmt TO your_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_user;
```

#### Data Integrity Issues
```sql
-- Check foreign key constraints
SELECT conname, conrelid::regclass, confrelid::regclass
FROM pg_constraint
WHERE contype = 'f';

-- Validate data integrity
SELECT COUNT(*) FROM users WHERE role_id NOT IN (SELECT id FROM roles);
```

## 📚 Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [SQL Style Guide](https://www.sqlstyle.guide/)
- [Database Design Best Practices](https://www.postgresql.org/docs/current/ddl-best-practices.html)

---

For application setup, see [../README.md](../README.md) 