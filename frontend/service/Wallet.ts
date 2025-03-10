import { MiddlewareChain, MiddlewareWalletResponse } from '@/client';
import { CONTENT_TYPE_JSON_UTF8 } from '@/constants/headers';
import { BACKEND_URL } from '@/constants/urls';

/**
 * Returns a list of available wallets
 */
const getWallets = async (signal: AbortSignal) =>
  fetch(`${BACKEND_URL}/wallet`, {
    signal,
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error('Failed to fetch wallets');
  }) as Promise<MiddlewareWalletResponse[]>;

const createEoa = async () =>
  fetch(`${BACKEND_URL}/wallet`, {
    method: 'POST',
    headers: { ...CONTENT_TYPE_JSON_UTF8 },
    body: JSON.stringify({ ledger_type: 'ethereum' }),
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error('Failed to create EOA');
  });

const createSafe = async (chain: MiddlewareChain, backup_owner?: string) =>
  fetch(`${BACKEND_URL}/wallet/safe`, {
    method: 'POST',
    headers: { ...CONTENT_TYPE_JSON_UTF8 },
    body: JSON.stringify({ chain, backup_owner, fund_amount: 0 }),
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error('Failed to create safe');
  });

const updateSafeBackupOwner = async (
  chain: MiddlewareChain,
  backup_owner: string,
) =>
  fetch(`${BACKEND_URL}/wallet/safe`, {
    method: 'PUT',
    headers: { ...CONTENT_TYPE_JSON_UTF8 },
    body: JSON.stringify({ chain, backup_owner }),
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error('Failed to add backup owner');
  });

export const WalletService = {
  getWallets,
  createEoa,
  createSafe,
  updateSafeBackupOwner,
};
