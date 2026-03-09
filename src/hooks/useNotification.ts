// ─── HOOK : NOTIFICATIONS ─────────────────────────────────────────────────────

import { useState, useCallback } from 'react';
import type { Notification, NotificationType } from '../types';
import { NOTIFICATION_DURATION_MS } from '../constants';

export function useNotification() {
  const [notification, setNotification] = useState<Notification | null>(null);

  const notify = useCallback((message: string, type: NotificationType = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), NOTIFICATION_DURATION_MS);
  }, []);

  const dismiss = useCallback(() => setNotification(null), []);

  return { notification, notify, dismiss };
}
