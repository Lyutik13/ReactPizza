import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import { setSearchValue } from '../../redux/slice/filterSlice';

// import { SearchContext } from '../../App';
import styles from './SearchPizzas.module.scss';

const SearchPizzas: React.FC = () => {
	const dispatch = useDispatch();

	const [valueInput, setValueInput] = React.useState('');
	// const { setSearchValue } = React.useContext(SearchContext);
	const inputRef = React.useRef<HTMLInputElement>(null);

	const onClickClear = () => {
		dispatch(setSearchValue(''));
		setValueInput('');
		// document.querySelector('input').focus();
		// if (inputRef.current) {
		// 	inputRef.current.focus();
		// }
    inputRef.current?.focus();
	};

	// eslint-disable-next-line
	const updateSearchValue = React.useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 1500),
		[],
	);

	const onChangeInput = (event: any) => {
		setValueInput(event.target.value);
		updateSearchValue(event.target.value);
	};
	return (
		<div className={styles.root}>
			<div className={styles.search}>
				<svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(0 -1028.4)">
						<path
							d="m14.938 12.281-2.844 2.813 6.906 6.906 2.844-2.844-6.906-6.875z"
							fill="#95a5a6"
							transform="translate(0 1028.4)"
						/>
						<path
							d="m15.562 1041.2c-0.473 1.3-1.472 2.4-2.75 2.9l2.188 2.3c1.16-0.7 2.137-1.7 2.812-2.9l-2.25-2.3z"
							fill="#7f8c8d"
						/>
						<path
							d="m18 10a8 8 0 1 1 -16 0 8 8 0 1 1 16 0z"
							fill="#bdc3c7"
							transform="translate(0 1028.4)"
						/>
						<path
							d="m15 10a5 5 0 1 1 -10 0 5 5 0 1 1 10 0z"
							fill="#ecf0f1"
							transform="translate(0 1028.4)"
						/>
					</g>
				</svg>
			</div>
			<input
				ref={inputRef}
				value={valueInput}
				onChange={onChangeInput}
				className={styles.input}
				type="text"
				placeholder="Поиск пиццы ..."
			/>
			<div className={styles.clear}>
				{valueInput && (
					<svg
						onClick={onClickClear}
						height="24"
						viewBox="0 0 48 48"
						width="24"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
						<path d="M0 0h48v48H0z" fill="none" />
					</svg>
				)}
			</div>
		</div>
	);
};

export default SearchPizzas;
