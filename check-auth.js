// Script to check current auth state
console.log('LocalStorage keys:', Object.keys(localStorage));
console.log('Auth token:', localStorage.getItem('__pb_superuser_auth__'));