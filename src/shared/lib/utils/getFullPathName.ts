export default function getFullPathName() {
  if (typeof window === 'undefined') {
    return '';
  }

  const pathName = window.location.pathname;
  const searchParams = window.location.search;

  const fullPath = pathName + searchParams;

  return fullPath;
}
