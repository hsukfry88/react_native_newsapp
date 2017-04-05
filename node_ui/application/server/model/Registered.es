import db from './connect';
export default class Registered{
	constructor() {
	}
	async saveLoginStatus(table,information){
		const sql =`INSERT INTO ${table} (tel,loginnumber) VALUES ('${information.phone}','1')`;
		//console.log('sql',sql);
		const data= await db.query(sql).spread((rows)=>{
				return rows;
		})
		console.log(data.affectedRows);
		return data.affectedRows;
	}

	async submitInfor(table,information){
			const sql =`UPDATE ${table} SET name='${information.user}',company='${information.company}',industry='${information.industry}',area='${information.region}'  where tel=${information.phone}`; 
			console.log('sql',sql);
			let  data= await db.query(sql).spread((rows)=>{
	 				return rows;
		 	}); 
		 	return data;
	}

	async updataInfor(table,information){
			const id=Number(information.uid);
			const sql =`UPDATE ${table} SET name='${information.user}',company='${information.company}',industry='${information.industry}',area='${information.region}',tel='${information.phone}' where id=${information.uid}`; 
			console.log('sql',sql);
			let  data= await db.query(sql).spread((rows)=>{
	 				return rows;
		 	}); 
		 	return data;
	}
}