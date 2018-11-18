<template>
	<div class="navbar2">
		<form class="form-control" @submit.prevent @submit="login()">
			<div class="form-group">
				<input type="text" class="form-control" placeholder="Login" v-model="email">
				<input type="password" class="form-control" placeholder="Mot de passe" v-model="password">
				<button type="submit">Login</button>
			</div>
		</form>
	</div>
</template>

<script>
	import axios from 'axios';
	import bus from "./../bus.js";
	
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
		login() {
			if(this.checkForm()) {
				let url = '/login';
				axios.post(url, {'email': this.email, 'password': this.password}).then((response) => {
					if(response.data == "logged in") {
						bus.$emit("loggedin", true);
					}
					this.clearLogin();
				}).catch((error) => {
					console.log(error);
					})
				}
			},
	  
		clearLogin() {  
			this.email = '';
			this.password = '';
			}
		}
	
	
	}
</script>