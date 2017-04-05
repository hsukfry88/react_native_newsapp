import db from './connect';
import moment from 'moment';

/*申报政策*/

class Declare {
	constructor() {}
	format(){
		return moment().format("YYYY-MM-DD hh:mm:ss");
	}
	async addItem(table,body){
		const myDate=this.format();
		console.log(myDate);
		const sql =`INSERT INTO ${table} (userid,policyid,policytitle,articaltype,company,tel,note,industry,name,declaretime,isview) VALUES ('${body.uid}','${body.policyid}','${body.policytitle}','${body.articaltype}','${body.company}','${body.tel}','${body.note}','${body.industry}','${body.name}','${myDate}','0')`;
	console.log(sql);                         
		const data= await db.query(sql).spread((rows)=>{
					if(rows.affectedRows>0){
						return {result:true}
					}
		 });
		return data;
	}	
	async starDeclare(table,uid){
		const sql=`select policyid,policytitle,articaltype FROM ${table} where userid=${uid} ORDER BY declaretime DESC  limit 10`;
		console.log(sql);
		const data= await db.query(sql).spread((rows)=>{
					return rows;
		 });;
		return data;
	}
	async SearchAll(num,starts){
		const sql ="SELECT tb_announcement.id,tb_policy.title,tb_announcement.startdate FROM tb_announcement LEFT JOIN tb_policy ON tb_policy.id=tb_announcement.policyid ORDER BY tb_announcement.createtime DESC limit " +starts+","+num;
		console.log(sql);
		let  data= await db.query(sql).spread((rows)=>{
	 				return rows;
		 });
		return data;
	}	

}
export default Declare;