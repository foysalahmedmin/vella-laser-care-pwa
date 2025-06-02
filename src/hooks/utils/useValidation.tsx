import { useCallback, useState } from "react";

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
}

export const useValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback(
    (field: string, value: string): string | null => {
      const rule = rules[field];
      if (!rule) return null;

      if (rule.required && !value.trim()) {
        return `${field} is required`;
      }

      if (value && rule.minLength && value.length < rule.minLength) {
        return `${field} must be at least ${rule.minLength} characters`;
      }

      if (value && rule.maxLength && value.length > rule.maxLength) {
        return `${field} must be no more than ${rule.maxLength} characters`;
      }

      if (value && rule.pattern && !rule.pattern.test(value)) {
        return `${field} format is invalid`;
      }

      if (value && rule.custom) {
        return rule.custom(value);
      }

      return null;
    },
    [rules],
  );

  const validateAll = useCallback(
    (data: Record<string, string>) => {
      const newErrors: Record<string, string> = {};
      let isValid = true;

      Object.keys(rules).forEach((field) => {
        const error = validateField(field, data[field] || "");
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      });

      setErrors(newErrors);
      return isValid;
    },
    [rules, validateField],
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setFieldError = useCallback((field: string, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  return {
    errors,
    validateField,
    validateAll,
    clearErrors,
    setFieldError,
  };
};
