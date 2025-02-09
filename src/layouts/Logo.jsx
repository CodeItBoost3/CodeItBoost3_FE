import Logoimg from '@/assets/icon/layout/header-logo.svg';
import { Link } from 'react-router-dom';

export default function Logo ( ) {
    return (
      <Link
        to="/"
        title="홈화면 이동"
        className="flex items-center justify-center rounded-full"
      >
        <img
          src={Logoimg}
          alt="Logo"
          className="h-full object-cover max-w-[110px]"
        />
      </Link>
    );
  }
  