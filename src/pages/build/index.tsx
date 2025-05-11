import React, { useState, useReducer, useMemo } from 'react';
import { Alert, Button, FormControl, InputGroup } from 'react-bootstrap';
import Layout from '@/components/Layout';
import { getDirPaths } from '@/functions/file';
import ZoomBar from '@/components/ZoomBar';
import ColorLegend from '@/components/ColorLegend';
import LineGrid from '@/components/Line/LineGrid';
import { GetStaticProps } from 'next';
import { SearchContext } from '@/context/search';
import lineReducer, { defaultLine, setLineAction } from '@/reducers/lineReducer';
import Icon from '@/components/Icon';
import BoostrapSwitch from '@/components/BoostrapSwitch';
import ReportABugLink from '@/components/ReportABugLink';
import useLocalStorage from '@/hooks/useLocalStorage';
import DownloadDropdown from '@/components/DownloadDropdown';
import Line from '@/types/Line';
import UploadCode from '@/components/UploadCode';
import { areCollapsablePoints } from '@/functions/line';
import useDownloadImg from '@/hooks/useDownloadImg';
import useDownloadCode from '@/hooks/useDownloadCode';
import { StringObject } from '@/types/Ui';
import { Card } from '@/types/Card';

export interface BuildProps {
	names?: StringObject;
	line?: Line;
	noStorage?: boolean;
}

export const PageBuild = (props: BuildProps) => {
	const [line, dispatchState] = useReducer(lineReducer, props.line || defaultLine);
	const [zoom, setZoom] = useState<number>(100);
	const [edition, edit] = useState<boolean>(true);

	const setLine = (line: Line) => dispatchState(setLineAction(line));

	const { removeItemFromStorage } = useLocalStorage({
		key: 'line',
		item: line,
		setItem: setLine,
		defaultItem: defaultLine,
		locked: props.noStorage,
	});

	useMemo(() => areCollapsablePoints(line), [line]);

	const { downloadCode, uploadCode, name, setName } = useDownloadCode(line, setLine);
	const { downloadImage, downloading, error } = useDownloadImg(line, name);

	const handleUpdate = (action: CallableFunction, ...args: any[]) => {
		dispatchState(action(...args));
	};

	const handleVoid = () => {
		setLine(defaultLine);
		// default value is not automaticaly stored in localstorage
		removeItemFromStorage();
	};

	return (
		<Layout
			title="Build your line"
			metatitle="Builder"
			metadescription={`Build yugioh steps`}
		>
			<blockquote className="blockquote">
				<b>Click</b> on a case from the grid to set a Card.
				<br /> At the moment there is no download button for images, the only way
				is to move zoom to the percent you need to get the full image, toggle the
				edit button and get a manual screenshot.
				<br /> Your work is saved on the browser for one line at a time but you
				can export it on your computer with the <b>Save</b> button and rework it
				later with the <b>Import</b> button.
			</blockquote>
			<div className="line-filters align-items-center">
				<BoostrapSwitch
					checked={edition}
					labelOn={
						<>
							Edit <Icon name="pencil-fill" />
						</>
					}
					labelOff={
						<>
							<Icon name="eye-fill" /> View
						</>
					}
					toggle={() => edit(!edition)}
				/>
				<Button
					variant="danger"
					disabled={line === defaultLine}
					onClick={handleVoid}
				>
					<Icon name="trash3-fill" /> Void
				</Button>
				<InputGroup className="width-auto d-inline-flex">
					<InputGroup.Text>Line title</InputGroup.Text>
					<FormControl
						id="line-title"
						max="100"
						onChange={e => setName(e.target.value)}
						value={name || ''}
						placeholder="_ _ _ _ _"
					/>
				</InputGroup>
				<DownloadDropdown
					downloadCode={downloadCode}
					downloadImage={downloadImage}
					loading={downloading}
					error={error}
				/>
				<UploadCode handleUpload={uploadCode} />
				<ReportABugLink />
				<ZoomBar handleZoom={setZoom} />
				<ColorLegend />
			</div>
			{!!error && (
				<div>
					<Alert variant="danger">{error}</Alert>
				</div>
			)}
			<SearchContext.Provider value={props.names}>
				<LineGrid
					line={line}
					zoom={zoom}
					handleUpdate={edition ? handleUpdate : undefined}
				/>
			</SearchContext.Provider>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const cards: Record<string, Card> = require('../../json/cards.json');
	const names: StringObject = {};

	Object.values(cards).forEach(card => {
		names[card.name] = card._id;
	});

	return { props: { names } };
};

export default PageBuild;
