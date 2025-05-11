import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import Icon from './Icon';
import { DISCORD_URL } from '@/consts/env';
import DropdownMenu from './DropdownMenu';

const Header: React.FC = () => (
	<header className="sticky-top">
		<Navbar bg="dark" variant="dark" /* expand="lg" */>
			<Container fluid className="justify-content-start">
				<Navbar.Brand as={Link} href="/">
					<Image src="/images/icon.png" alt="logo" height="26" width="32" />{' '}
					<span className="d-none d-sm-inline-block">Yu-Gi-Oh!</span>
				</Navbar.Brand>
				<Nav className="flex-grow-1">
					<DropdownMenu
						className="nav-link"
						toggle={{ content: 'Yu-Gi-Oh!' }}
						items={[
							{ href: '/', content: 'Deck Randomizer' },
							{ href: '/build', content: 'Steps Builder' },
						]}
					/>
					<DropdownMenu
						className="nav-link"
						toggle={{ content: 'Digimon' }}
						items={[
							{
								href: 'https://digimon-lines.com//build',
								target: '_blank',
								content: 'Builder',
							},
							{
								href: 'https://digimon-lines.com//',
								target: '_blank',
								content: 'Lines',
							},
							{
								href: 'https://digimon-lines.com//groups',
								target: '_blank',
								content: 'Groups',
							},
							{
								href: 'https://digimon-lines.com//vbs',
								target: '_blank',
								content: 'DIM',
							},
						]}
					/>
					<DropdownMenu
						className="nav-link"
						toggle={{ content: 'Pokémon' }}
						items={[
							{
								href: 'https://digimon-lines.com//build/pokemon',
								target: '_blank',
								content: 'Builder',
							},
						]}
					/>
					<DropdownMenu
						className="nav-link d-none d-sm-block"
						toggle={{ content: 'Dragon Quest' }}
						items={[
							{
								href: 'https://dragon-quest-synth.vercel.app/build',
								target: '_blank',
								content: 'Builder',
							},
							{
								href: 'https://dragon-quest-synth.vercel.app',
								target: '_blank',
								content: 'Synthesis',
							},
						]}
					/>
				</Nav>
				<Link
					href={DISCORD_URL}
					target="_blank"
					rel="nofollow noopener noreferrer"
					title="discord"
					className="fs-4"
				>
					<Icon name="discord" />
				</Link>
			</Container>
		</Navbar>
	</header>
);
export default Header;
