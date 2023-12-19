import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Paginate.module.scss';

type PaginateProps = {
	paginatePage: number;
	onPageChange: (page: number) => void;
};

const Paginate: React.FC<PaginateProps> = ({ paginatePage, onPageChange }) => {
	return (
		<ReactPaginate
			className={styles.paginate}
			breakLabel="..."
			nextLabel=">"
			onPageChange={(event) => onPageChange(event.selected + 1)}
			pageRangeDisplayed={8}
			pageCount={2}
			forcePage={paginatePage - 1}
			previousLabel="<"
			renderOnZeroPageCount={null}
		/>
	);
};

export default Paginate;
