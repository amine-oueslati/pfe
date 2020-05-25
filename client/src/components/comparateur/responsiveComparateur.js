import React from 'react'

import Comparateur from './comparateur'

import { Responsive } from 'semantic-ui-react'


const ResponsiveComparateur = () => {

	return (
		<div>
			<Responsive minWidth={Responsive.onlyTablet.minWidth}>
				<Comparateur screen={"desktop"} />
			</Responsive>

			<Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
				<Comparateur screen={"mobile"} />
			</Responsive>

		</div>
	)
}
export default ResponsiveComparateur