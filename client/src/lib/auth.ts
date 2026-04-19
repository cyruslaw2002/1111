// KYWC 3D班網 — 認證工具函數
// 使用 localStorage 儲存 token，24小時過期

export function checkAuth(): boolean {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const authToken = localStorage.getItem('authToken');

  if (!isLoggedIn || !authToken) {
    return false;
  }

  try {
    const tokenData = JSON.parse(atob(authToken));
    const currentTime = Date.now();
    const tokenAge = currentTime - tokenData.timestamp;

    if (tokenAge > 24 * 60 * 60 * 1000) {
      clearAuth();
      return false;
    }

    return true;
  } catch {
    clearAuth();
    return false;
  }
}

export function clearAuth(): void {
  localStorage.removeItem('authToken');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userRole');
}

export function setAuth(role: string = 'student'): void {
  const tokenData = { timestamp: Date.now(), role };
  const token = btoa(JSON.stringify(tokenData));
  localStorage.setItem('authToken', token);
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userRole', role);
}

export function getUserRole(): string {
  return localStorage.getItem('userRole') || 'student';
}
