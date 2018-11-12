<template>
    <form action="/login" method = "POST">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Login" name="email">
            <input type="text" class="form-control" placeholder="Mot de passe" name="password">
            <button type="submit">Login</button>
        </div>
    </form>
</template>

<script>	
	export default {
        name: 'login',

		data() {
		return {
			email: '',
			password: ''
		}
	
		},
	
		methods: {

		checkForm() {
			if(this.email && this.password) {
				return true;
			}
			return false;
		},

		login(event) {
			if (event) event.preventDefault();
			if(this.checkForm()) {
			let url = '/login';
			var bodyFormData = new FormData();
			bodyFormData.set('email', this.email);
			bodyFormData.set('password', this.password);
			axios.post(url, bodyFormData).then((response) => {
				console.log(response);
				this.clearLogin();
				this.refreshLogin();
			}).catch((error) => {
				console.log(error);
		
			})
	
			}
		},
		clearLogin() {  
			this.email = '';
			this.password = '';
		},
		refreshArticle() {
			bus.$emit("refreshLogin");	
		}	
		}
	
	
	}
	</script>