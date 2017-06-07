/*SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo
FROM Persons
LEFT JOIN Orders
ON Persons.Id_P=Orders.Id_P
ORDER BY Persons.LastName
*/
import db from './connect';
class NewsModel{
	constructor(props) {
	}
	/*获取首页banner*/
	async Banner(){
		let data= await db.query('SELECT * FROM tb_banner')
		.spread((rows)=>{
	 				return rows;
		});
		return data;
	}
	/*获取首页申报公告*/
	async searchNews(){
			let data=await db.query('SELECT tb_announcement.id,tb_policy.title,tb_announcement.startdate,tb_announcement.enddate,tb_announcement.keywords FROM tb_announcement LEFT JOIN tb_policy ON tb_policy.id=tb_announcement.policyid ORDER BY tb_announcement.createtime DESC limit 10')
	 				.spread((rows)=>{
	 				return rows;
		 		});
				return data;
	}
	/*获取相关政策*/
	async RelatedNews(table,keywords){
			let data=await db.query("SELECT `id`,`title`,`issuer`,`releasetime` FROM  "+table+"  WHERE keywords  LIKE '%"+keywords+"%'  ORDER BY releasetime DESC limit 10")
			.spread((rows)=>{
				return rows;
			})
			//console.log(data);
			return data;
	}
}

export default NewsModel;
