import db from './connect';
import moment from 'moment';
class PolicyModel {
	constructor() {}
	async hotPolicy(num,starts){
		const sql ="SELECT `id`,`title`,`city`,`createtime`,`keywords`,`issuer` FROM  tb_policy ORDER BY createtime DESC limit " +num+" offset "+starts;
		let  data= await db.query(sql).spread((rows)=>{
	 				return rows;
		 		});
		return data;		
	}
	
	async SearchAll(table,type,num,starts){
		const sql ="SELECT `id`,`title`,`city`,`releasetime`,`issuer` FROM "+table+" where type LIKE  '%"+type+"%' order by releasetime desc limit " +starts+","+num;
		console.log(sql);
		let  data= await db.query(sql).spread((rows)=>{
	 				return rows;
		 });
		return data;
	}	
}
export default PolicyModel;