import db from './connect';
class Artical{
	constructor() {}
	/*政策详情*/
	async policyDetail(table,id){
		const sql ="select `title`,`keywords`,`releasetime`,`issuer`,`content` from "+table+" where id= "+id;                         
		let result= await db.query(sql).spread((rows)=>{
	 				return rows[0];
		});
		return result;
	}

	async getPolicyId(table,id){
		const sql ="select `title` from "+table+" where id= "+id;
		let result= await db.query(sql).spread((rows)=>{
			return rows[0];
		})
		return result;  		
	}

	/*申报详情*/
	async applyDetail(table,id){
		const sql ="select `policyid`,`startdate`,`enddate`,`conditions`,`keywords` from "+table+" where id= "+id;
		//console.log(sql);                         
		let result= await db.query(sql).spread((rows)=>{
	 				return rows[0];
		});
		const policyTitle=await this.getPolicyId('tb_policy',result.policyid);
		result=Object.assign(result,policyTitle);
		return result;
	}
	async getContent(table,id){
		const sql ="select `content`,`startdate`,`enddate`,'conditions','keywords' from "+table+" where id= "+id;
		//console.log(sql);                         
		let result= await db.query(sql).spread((rows)=>{
	 				return rows;
		});
		return result;
	}	
}
export default Artical;