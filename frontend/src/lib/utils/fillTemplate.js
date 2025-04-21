export function fillTemplate(template, values) {
  return Object.entries(values).reduce(
    (text, [key, val]) =>
      text.replace(new RegExp(`{${key}}`, 'g'), val || `{${key}}`),
    template
  );
}
