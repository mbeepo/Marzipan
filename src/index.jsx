import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

import App from "./routes/app";
import Creator from "./routes/creator";
import List from "./routes/list";
import Vars from "./routes/vars";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";

PouchDB.plugin(PouchDBFind);

const db = new PouchDB("documents");

db.createIndex({
	index: { fields: ["sortKey", "tags", "type"], ddoc: "tags" }
})
	.then(() =>
		db.createIndex({
			index: { fields: ["sortKey", "type"], ddoc: "type" }
		})
	)
	.then(() => {
		db.createIndex({
			index: { fields: ["type", "name", "tag"], ddoc: "vars" }
		});
	});

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/" element={<List db={db} />} />
					<Route path="create" element={<Creator db={db} />} />
					<Route path="vars" element={<Vars db={db} />} />
				</Route>
			</Routes>
		</HashRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
