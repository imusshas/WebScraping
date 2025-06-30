import { useState } from "react";

import SearchInput from "./layout/SearchInput";

const Home = () => {
	const [searchKey, setSearchKey] = useState("");
	return (
		<div className="search-container">
			<SearchInput searchKey={searchKey} setSearchKey={setSearchKey} />
		</div>
	);
};

export default Home;
