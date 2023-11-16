import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Paginate.module.scss';

const Paginate = ({ onPageChange }) => {
	return (
		<ReactPaginate
			className={styles.paginate}
			breakLabel="..."
			nextLabel=">"
			onPageChange={(event) => onPageChange(event.selected + 1)}
			pageRangeDisplayed={8}
			pageCount={2}
			previousLabel="<"
			renderOnZeroPageCount={null}
		/>
	);
};

export default Paginate;
