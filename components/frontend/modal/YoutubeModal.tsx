import React from 'react';

export function YoutubeModal({ link, setPlay }: any) {
	return (
		<div>
			<div className="">
				<div
					className="modal-box absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
					style={{ width: '100%', maxWidth: '700px' }}
				>
					<div className="modal-action " style={{ marginTop: '0' }}>
						<label
							onClick={() => setPlay(false)}
							style={{ cursor: 'pointer' }}
							htmlFor="my_modal_6"
						>
							✕
						</label>
					</div>
					<iframe
						id="ytplayer"
						width="100%"
						height="360"
						src={link}
						frameBorder="0"
					></iframe>
				</div>
			</div>
		</div>
	);
}
