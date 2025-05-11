import LineGrid from '@/components/Line/LineGrid';
import Line from '@/types/Line';
import { GetServerSideProps } from 'next';

export interface ScreenShotProps {
	line?: Line;
	zoom?: number;
}

const PageScreenShot: React.FC<ScreenShotProps> = props => {
	if (!props.line) return <div>Line is missing</div>;
	return (
		<div className="page container-fluid">
			<style>{'header{display: none}'}</style>
			<LineGrid line={props.line} zoom={props.zoom} />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }: any) => {
	try {
		let line = query?.line;
		if (line) line = JSON.parse(line as string) as Line;

		const props: ScreenShotProps = { zoom: 100 };
		if (line) props.line = line;
		return { props };
	} catch (e) {
		console.error(e);
		return { props: {} };
	}
};

export default PageScreenShot;
