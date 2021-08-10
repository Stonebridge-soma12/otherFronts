import React from 'react';
import style from './index.module.css';
import useAuthentication, { UserType } from '../../hooks/useAuthentication';
import Logo from './Logo';
import AuthNavigation from './AuthNavigation/AuthNavigation';
import UserNavigation from './UserNavigation';

type Props = {
	children?: any;
};

const Navigation = ({ children }: Props) => {
	const { user } = useAuthentication();

	return (
		<header className={`${style.topHeader}`}>
			<div className={`${style.headerWrapper}`}>
				<Logo />
				<div className="top-center">{children}</div>
				<div className="top-right">
					{user && (user.type === UserType.Login ? <UserNavigation user={user} /> : <AuthNavigation />)}
				</div>
			</div>
		</header>
	);
};

Navigation.defaultProps = {
	children: <></>,
};

export default Navigation;