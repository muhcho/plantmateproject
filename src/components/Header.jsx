import React from 'react';
import QRIcon from '../assets/qrcode-scan.svg';
import AvatarIcon from '../assets/avatar_bison.svg';
import Logo from '../assets/logo_darkgreen.svg';

export default function Header() {
  return (
    <header className="header">
      <img src={QRIcon} alt="QR Code" className="header-icon qr-icon" />
      <img src={Logo} alt="Logo" className="header-logo" />
      <img src={AvatarIcon} alt="Avatar" className="header-icon avatar-icon" />
    </header>
  );
}
