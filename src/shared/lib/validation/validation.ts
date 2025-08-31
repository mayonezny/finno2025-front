export type ValidationPreset =
  | 'none'
  | 'required'
  | 'email'
  | 'password'
  | 'name'
  | 'number'
  | 'tel';

export type ValidationRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
};

export type ValidationMessages = Partial<{
  required: string;
  email: string;
  passwordMin: string;
  nameMin: string;
  number: string;
  tel: string;
  tooShort: (min: number) => string;
  tooLong: (max: number) => string;
  pattern: string;
}>;

export const DEFAULT_MESSAGES: Required<Omit<ValidationMessages, 'tooShort' | 'tooLong'>> & {
  tooShort: (n: number) => string;
  tooLong: (n: number) => string;
} = {
  required: 'Поле обязательно',
  email: 'Неверный e-mail',
  passwordMin: 'Минимум 6 символов',
  nameMin: 'Минимум 2 символа',
  number: 'Введите число',
  tel: 'Введите номер телефона',
  pattern: 'Неверный формат',
  tooShort: (n) => `Минимум ${n} символов`,
  tooLong: (n) => `Максимум ${n} символов`,
};

export type PresetMeta = {
  type?: React.HTMLInputTypeAttribute;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
} & ValidationRules;

export const PRESET_RULES: Record<Exclude<ValidationPreset, 'none'>, PresetMeta> = {
  required: { required: true },
  email: { required: true, type: 'email', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i },
  password: { required: true, type: 'password', minLength: 6 },
  name: { required: true, minLength: 2, maxLength: 64 },
  number: { required: true, inputMode: 'decimal', pattern: /^-?\d+(\.\d+)?$/ },
  tel: { required: true, inputMode: 'tel', pattern: /^[0-9()+\-\s]{6,}$/ },
};

export function mergeRules(
  preset: ValidationPreset,
  rules?: ValidationRules,
): PresetMeta | undefined {
  const base = preset !== 'none' ? PRESET_RULES[preset] : undefined;
  return base ? { ...base, ...rules } : (rules as PresetMeta | undefined);
}

export function buildConstraints(preset: ValidationPreset, rules?: ValidationRules) {
  const m = mergeRules(preset, rules);
  const attrs: {
    required?: boolean;
    type?: React.HTMLInputTypeAttribute;
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  } = {};
  if (!m) {
    return attrs;
  }
  if (m.required) {
    attrs.required = true;
  }
  if (m.type) {
    attrs.type = m.type;
  }
  if (m.inputMode) {
    attrs.inputMode = m.inputMode;
  }
  if (m.minLength) {
    attrs.minLength = m.minLength;
  }
  if (m.maxLength) {
    attrs.maxLength = m.maxLength;
  }
  if (m.pattern) {
    attrs.pattern = m.pattern.source;
  }
  return attrs;
}

export function validateValue(
  value: string,
  preset: ValidationPreset,
  rules?: ValidationRules,
  messages?: ValidationMessages,
): string {
  const msg = { ...DEFAULT_MESSAGES, ...messages };
  const m = mergeRules(preset, rules);

  if (!m) {
    return '';
  }

  const v = value ?? '';

  if (m.required && !v.trim()) {
    return msg.required;
  }

  if (m.minLength && v.length < m.minLength) {
    if (preset === 'password') {
      return msg.passwordMin;
    }
    if (preset === 'name') {
      return msg.nameMin;
    }
    return msg.tooShort(m.minLength);
  }

  if (m.maxLength && v.length > m.maxLength) {
    return msg.tooLong(m.maxLength);
  }

  if (m.pattern && !m.pattern.test(v)) {
    switch (preset) {
      case 'email':
        return msg.email;
      case 'number':
        return msg.number;
      case 'tel':
        return msg.tel;
      default:
        return msg.pattern;
    }
  }

  if (m.custom) {
    const customErr = m.custom(v);
    if (customErr) {
      return customErr;
    }
  }

  return '';
}
