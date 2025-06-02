export const validationRules = {
  checkout: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      custom: (value: string) => {
        if (value && !value.includes("@")) {
          return "Please enter a valid email address";
        }
        return null;
      },
    },
    phone: {
      required: true,
      pattern: /^[0-9+\-\s()]+$/,
      minLength: 10,
      custom: (value: string) => {
        const cleanPhone = value.replace(/[^0-9]/g, "");
        if (cleanPhone.length < 10) {
          return "Phone number must be at least 10 digits";
        }
        return null;
      },
    },
    address: {
      required: true,
      minLength: 10,
      maxLength: 200,
    },
    city: {
      required: true,
    },
    postal: {
      required: true,
      pattern: /^[0-9]{4,6}$/,
      custom: (value: string) => {
        if (value && (value.length < 4 || value.length > 6)) {
          return "Postal code must be 4-6 digits";
        }
        return null;
      },
    },
  },
};
