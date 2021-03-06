/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import Gridicon from 'gridicons';
import moment from 'moment';
import { Gravatar } from '@woocommerce/components';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { ActivityCard } from '../';

describe( 'ActivityCard', () => {
	test( 'should have correct title', () => {
		const { getByRole } = render(
			<ActivityCard title="Inbox message">
				This card has some content
			</ActivityCard>
		);
		expect(
			getByRole( 'heading', { name: 'Inbox message' } )
		).toBeInTheDocument();
	} );

	test( 'should render a basic card', () => {
		const { container } = render(
			<ActivityCard title="Inbox message">
				This card has some content
			</ActivityCard>
		);
		expect( container ).toMatchSnapshot();
	} );

	test( 'should render an unread bubble on a card', () => {
		const { container } = render(
			<ActivityCard title="Inbox message" unread>
				This card has some content
			</ActivityCard>
		);
		expect( container ).toMatchSnapshot();
	} );

	test( 'should render a custom icon on a card', () => {
		const { container } = render(
			<ActivityCard
				title="Inbox message"
				icon={ <Gridicon icon="customize" /> }
			>
				This card has some content
			</ActivityCard>
		);
		expect( container ).toMatchSnapshot();
	} );

	test( 'should render a gravatar on a card', () => {
		const { container } = render(
			<ActivityCard
				title="Inbox message"
				icon={ <Gravatar user="admin@local.test" /> }
			>
				This card has some content
			</ActivityCard>
		);
		expect( container ).toMatchSnapshot();
	} );

	test( 'should render a timestamp on a card', () => {
		// We're generating this via moment to ensure it's always "3 days ago".
		const threeDaysAgo = moment().subtract( 3, 'days' ).format();
		const { container } = render(
			<ActivityCard title="Inbox message" date={ threeDaysAgo }>
				This card has some content
			</ActivityCard>
		);
		expect( container ).toMatchSnapshot();
	} );

	test( 'should render an action on a card', () => {
		const noop = () => {};
		const { container } = render(
			<ActivityCard
				title="Inbox message"
				actions={
					<Button isSecondary onClick={ noop }>
						Action
					</Button>
				}
			>
				This card has some content
			</ActivityCard>
		);
		expect( container ).toMatchSnapshot();
	} );

	test( 'should render multiple actions on a card', () => {
		const noop = () => {};
		const { container } = render(
			<ActivityCard
				title="Inbox message"
				actions={ [
					<Button key="action1" isPrimary onClick={ noop }>
						Action 1
					</Button>,
					<Button key="action2" isSecondary onClick={ noop }>
						Action 2
					</Button>,
				] }
			>
				This card has some content
			</ActivityCard>
		);
		expect( container ).toMatchSnapshot();
	} );
} );
