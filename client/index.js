/**
 * External dependencies
 */
import '@wordpress/notices';
import { render } from '@wordpress/element';
import {
	withCurrentUserHydration,
	withSettingsHydration,
} from '@woocommerce/data';

/**
 * Internal dependencies
 */
import './stylesheets/_index.scss';
import { PageLayout, EmbedLayout, PrimaryLayout as NoticeArea } from './layout';
import { CustomerEffortScoreTracksContainer } from './customer-effort-score-tracks';
import Navigation from './navigation';

// Modify webpack pubilcPath at runtime based on location of WordPress Plugin.
// eslint-disable-next-line no-undef,camelcase
__webpack_public_path__ = global.wcAdminAssets.path;

const appRoot = document.getElementById( 'root' );
const embeddedRoot = document.getElementById( 'woocommerce-embedded-root' );
const settingsGroup = 'wc_admin';
const hydrateUser = window.wcSettings.currentUserData;

if ( appRoot ) {
	let HydratedPageLayout = withSettingsHydration(
		settingsGroup,
		window.wcSettings
	)( PageLayout );
	const hydrateSettings =
		window.wcSettings.preloadSettings &&
		window.wcSettings.preloadSettings.general;

	if ( hydrateSettings ) {
		HydratedPageLayout = withSettingsHydration( 'general', {
			general: window.wcSettings.preloadSettings.general,
		} )( HydratedPageLayout );
	}
	if ( hydrateUser ) {
		HydratedPageLayout = withCurrentUserHydration( hydrateUser )(
			HydratedPageLayout
		);
	}
	render( <HydratedPageLayout />, appRoot );
} else if ( embeddedRoot ) {
	let HydratedEmbedLayout = withSettingsHydration(
		settingsGroup,
		window.wcSettings
	)( EmbedLayout );
	if ( hydrateUser ) {
		HydratedEmbedLayout = withCurrentUserHydration( hydrateUser )(
			HydratedEmbedLayout
		);
	}
	// Render the header.
	render( <HydratedEmbedLayout />, embeddedRoot );

	embeddedRoot.classList.remove( 'is-embed-loading' );

	// Render notices just above the WP content div.
	const wpBody = document.getElementById( 'wpbody-content' );
	const wrap =
		wpBody.querySelector( '.wrap.woocommerce' ) ||
		wpBody.querySelector( '[class="wrap"]' );
	const noticeContainer = document.createElement( 'div' );

	render(
		<div className="woocommerce-layout">
			<NoticeArea />
		</div>,
		wpBody.insertBefore( noticeContainer, wrap )
	);
}

const navigationRoot = document.getElementById(
	'woocommerce-embedded-navigation'
);

if ( navigationRoot ) {
	render( <Navigation />, navigationRoot );
}

// Set up customer effort score survey.
( function () {
	const root = appRoot || embeddedRoot;

	render(
		<CustomerEffortScoreTracksContainer />,
		root.insertBefore( document.createElement( 'div' ), null )
	);
} )();
