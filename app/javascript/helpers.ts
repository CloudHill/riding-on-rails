function formatDate(date: Date) {
  return date.toLocaleDateString(
    undefined, 
    {weekday: "short", day: 'numeric', month: "short"}
  );
}

function getCsrfToken(): string {
  return document
    .querySelector('meta[name="csrf-token"]')
    .attributes['content'].value;
}

export {
  formatDate, 
  getCsrfToken
}