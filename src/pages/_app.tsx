import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-switch-button-react/src/style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/styles/index.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Header from '@/components/Header';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ErrorBoundary>
			<Header />
			<Component {...pageProps} />
			<Analytics />
		</ErrorBoundary>
	);
}
