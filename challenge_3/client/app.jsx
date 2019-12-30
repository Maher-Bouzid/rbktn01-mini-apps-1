
class App extends React.Component {
	constructor() {
		super()
		this.state = {
			currentForm: 0,
			data: {}
		}
	}

	previous(e) {
		e.preventDefault()
		let dec = this.state.currentForm - 1;
		this.setState({
			currentForm: dec,
		})
	}

	getData(e) {
		// e.preventDefault();
		console.log(e)
		let inc = this.state.currentForm + 1;
		let data = this.state.data;
		document.querySelectorAll('input').forEach(elm => {
			if (elm.name) {
				data[elm.name] = elm.value
			}
		})
		this.setState({
			currentForm: inc,
			data: data
		})
	}

	puchase() {
		$.ajax({
			url: '/form',
			type: 'POST',
			data: this.state.data
		}).then(() => {
			this.setState({
				currentForm: 0,
				data: {}
			})
		})
	}
	render() {
		return (
			this.state.currentForm === 0 ? <button onClick={this.getData.bind(this)}>Checkout</button> :
				this.state.currentForm === 1 ?
					<Form1 getData={this.getData.bind(this)} previous={this.previous.bind(this)} states={this.state.data} /> :
					this.state.currentForm === 2 ?
						<Form2 getData={this.getData.bind(this)} previous={this.previous.bind(this)} states={this.state.data} /> :
						this.state.currentForm === 3 ?
							<Form3 getData={this.getData.bind(this)} previous={this.previous.bind(this)} states={this.state.data} /> :
							<ConfirmationPage purchase={this.puchase.bind(this)} previous={this.previous.bind(this)} states={this.state.data} />
		)
	}
}

class Form1 extends React.Component {
	render() {
		return (
			<div>
				<form action="/form" methode='POST' target="_blanck">
					<label>First Name</label>
					<input type="text" name="firstName" id='firstName' value={this.props.states.firstName} required /><br />
					<label>Last Name</label>
					<input type="text" name="lastName" id='lastName' value={this.props.states.lastName} required /><br />
					<label>Email</label>
					<input type="email" name="email" id='email' value={this.props.states.email} required /><br />
					<label>Password</label>
					<input type="password" name="password" id='password' required /><br />
					<input type="submit" value="NEXT" onClick={this.props.getData.bind(this)} />
				</form>
			</div>
		)
	}
}

class Form2 extends React.Component {
	render() {
		return (
			<div>
				<form action="#" method="post" target="_blanck">
					<label>line 1</label>
					<input type="text" required name="line1" id='line1' value={this.props.states.line1} /><br />
					<label>line2</label>
					<input type="text" name="line2" id='line2' value={this.props.states.line2} /><br />
					<label>City</label>
					<input type="text" required name="city" id='city' value={this.props.states.city} /><br />
					<label>Zip Code</label>
					<input type="number" required name="zipCode" id='zipCode' value={this.props.states.zipCode} /><br />
					<input type="submit" value="PREVIOUS" onClick={this.props.previous.bind(this)} />
					<input type="submit" value="NEXT" onClick={this.props.getData.bind(this)} />
				</form>
			</div>
		)
	}
}

class Form3 extends React.Component {
	render() {
		return (
			<div>
				<form action="" method="post" target="_blanck">
					<label>credit card #</label>
					<input type="text" required name="creditCard" id='creditCard' value={this.props.states.creditCard} /><br />
					<label>expiry date</label>
					<input type="month" required name="expiryDate" id='expiryDate' value={this.props.states.expiryDate} /><br />
					<label>CVV</label>
					<input type="text" required name="CVV" id='CVV' value={this.props.states.CVV} /><br />
					<label>Billing zip code</label>
					<input type="text" required name="billingZipCode" id='billingZipCode' value={this.props.states.billingZipCode} /><br />
					<input type="submit" value="PREVIOUS" onClick={this.props.previous.bind(this)} />
					<input type="submit" value="NEXT" onClick={this.props.getData.bind(this)} />
				</form>
			</div>
		)
	}
}

class ConfirmationPage extends React.Component {
	render() {
		return (
			<div>
				{
					Object.keys(this.props.states).map(elm => (
						< Inputs elm={elm} value={this.props.states[elm]} />
					))
				}
				<input type="submit" value="PREVIOUS" onClick={this.props.previous.bind(this)} />
				<input type="submit" value="Purchase" onClick={this.props.purchase.bind(this)} />
			</div>
		)
	}
}

class Inputs extends React.Component {
	render() {
		return (
			<div>
				<h4>{this.props.elm} : {this.props.elm === "password" ? '*'.repeat(this.props.value.length) : this.props.value}</h4>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))