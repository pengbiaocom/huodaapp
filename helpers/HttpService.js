import ServiceBase from 'ServiceBase'

class Service extends ServiceBase {
	constructor() {
		super()
		this.$$prefix = ''
		this.$$path = {
      wechatSignIn: 'wxapp/public/login',
      messge: 'wxapp/message',
      address:'wxapp/address',
      user:'wxapp/user',
      cargo:'home/cargo',
      order:'home/order',
      address1:'home/address',
      Geo:'home/Geo',
      Faq:'home/faq',
    }
	}

	wechatSignIn(params) {
		return this.postRequest(this.$$path.wechatSignIn, params)
	}

  postUserInfo(params){
    return this.postRequest(`${this.$$path.user}/getUserInfo`, params)
  }

  postUpdateUser(params){
    return this.postRequest(`${this.$$path.user}/update_user`, params)
  }

  postAddFaq(params){
    return this.postRequest(`${this.$$path.Faq}/read`, params)
  }

  getUserAddress(params){
    return this.getRequest(`${this.$$path.address1}/read`, params)
  }

  postAddOrder(params){
    return this.getRequest(`${this.$$path.order}/save`, params)
  }

  postPayment(params) {
    return this.postRequest(`${this.$$path.order}/prepay`, params)
  }

  getIsTui(params){
    return this.getRequest(`${this.$$path.order}/order_tui`, params)
  }

  getOrderList(params){
    return this.getRequest(`${this.$$path.order}/index`, params)
  }

  getOrderDetail(params){
    return this.getRequest(`${this.$$path.order}/detail`, params)
  }

  getCargo(params){
    return this.getRequest(`${this.$$path.cargo}`, params)
  }
	
	getMessage(params) {
    return this.getRequest(`${this.$$path.messge}/lists`, params)
	}

  getProblem(params){
    return this.getRequest(`${this.$$path.messge}/problem`, params)
  }

  getMessageDetail(params) {
    return this.getRequest(`${this.$$path.messge}/read`, params)
  }

  postAddress(params){
    return this.getRequest(`${this.$$path.address}/add`, params)
  }

  getOrderDate(params){
    return this.getRequest(`${this.$$path.Geo}/read`, params)
  }
  
  getOrderDelete(params){
    return this.getRequest(`${this.$$path.user}/order_delete`, params)
  }
  
}

export default Service