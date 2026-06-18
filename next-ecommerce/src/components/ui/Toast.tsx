"use client";

import { useEffect } from "react";
import { XMarkIcon, CheckCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectToasts, removeToast } from "@/store/slices/toastSlice";

export default function Toast() {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(selectToasts);

  useEffect(() => {
    toasts.forEach((toast) => {
      const duration = toast.duration || 3000;
      const timer = setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, duration);

      return () => clearTimeout(timer);
    });
  }, [toasts, dispatch]);

  if (toasts.length === 0) {
    return null;
  }

  const getIcon = (type?: string) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case "cart":
        return <ShoppingCartIcon className="h-5 w-5 text-blue-600" />;
      default:
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
    }
  };

  const getBgColor = (type?: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "cart":
        return "bg-blue-50 border-blue-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-green-50 border-green-200";
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`max-w-sm rounded-lg border p-4 shadow-lg animate-in slide-in-from-left-full duration-300 ${getBgColor(
            toast.type
          )}`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">{getIcon(toast.type)}</div>

            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{toast.message}</p>
            </div>

            <div className="flex-shrink-0 ml-4">
              <button
                onClick={() => dispatch(removeToast(toast.id))}
                className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
