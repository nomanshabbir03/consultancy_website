import ApiError from './ApiError.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value) => (typeof value === 'string' ? value.trim() : '');

/**
 * Validates `body` against a small rule map and returns the cleaned values.
 * Rule: { required?, email?, number?, min?, max?, oneOf? }
 * Throws a 400 ApiError with `errors: { field: message }` when something is wrong.
 */
export function validateBody(body, rules) {
  const values = {};
  const errors = {};

  for (const [field, rule] of Object.entries(rules)) {
    const value = clean(body?.[field]);
    values[field] = value;

    if (!value) {
      if (rule.required) errors[field] = 'This field is required.';
      continue;
    }
    if (rule.email && !EMAIL_PATTERN.test(value)) errors[field] = 'Please enter a valid email address.';
    else if (rule.number && !(Number.isFinite(Number(value)) && Number(value) >= 0)) errors[field] = 'Please enter a valid number.';
    else if (rule.min && value.length < rule.min) errors[field] = `Must be at least ${rule.min} characters.`;
    else if (rule.max && value.length > rule.max) errors[field] = `Must be at most ${rule.max} characters.`;
    else if (rule.oneOf && !rule.oneOf.includes(value)) errors[field] = 'Please choose a valid option.';
  }

  if (Object.keys(errors).length) throw ApiError.badRequest('Please correct the highlighted fields.', errors);
  return values;
}
