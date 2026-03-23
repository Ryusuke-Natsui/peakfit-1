import { useInstallPrompt } from '../../hooks/useInstallPrompt';

export function InstallButton() {
  const { canInstall, install } = useInstallPrompt();

  if (!canInstall) {
    return <span className="ghost-label">PWA Ready</span>;
  }

  return (
    <button className="primary-button" type="button" onClick={install}>
      インストール
    </button>
  );
}
