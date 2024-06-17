import { Attributes, Component, ComponentChild, ComponentChildren, Ref, render } from 'preact';

import preactLogo from './assets/preact.svg';
import './style.css';
import { useEffect, useState } from 'preact/hooks';

const App = () => {
	const [thrusterForce, setThrusterForce] = useState(0);
	const [gravitationalAcceleration, setGravitationalAcceleration] = useState(9.81);
	const [stoppingDistance, setStoppingDistance] = useState(1000);
	const [startingSpeed, setStartingSpeed] = useState(105);
	const [maxWeight, setMaxWeight] = useState(0);

	// small grid thrusters
	const [sgAtmosCount, setSgAtmosCount] = useState(0);
	const [sgLAtmosCount, setSgLAtmosCount] = useState(0);
	const [sgFlatmoCount, setSgFlatmoCount] = useState(0);
	const [sgLFlatmoCount, setSgLFlatmoCount] = useState(0);
	const [sgIonCount, setSgIonCount] = useState(0);
	const [sgLIonCount, setSgLIonCount] = useState(0);
	const [sgHydrogenCount, setSgHydrogenCount] = useState(0);
	const [sgLHydrogenCount, setSgLHydrogenCount] = useState(0);

	useEffect(() => {
		setThrusterForce((
			(sgAtmosCount * 96) +
			(sgLAtmosCount * 576) +
			(sgFlatmoCount * 32) +
			(sgLFlatmoCount * 230) +
			(sgIonCount * 14.4) +
			(sgLIonCount * 172.8) +
			(sgHydrogenCount * 98.4) +
			(sgLHydrogenCount * 480)
		) * 1000)
	}, [sgAtmosCount, sgLAtmosCount, sgFlatmoCount, sgLFlatmoCount, sgIonCount, sgLIonCount, sgHydrogenCount, sgLHydrogenCount]);

	useEffect(() => {
		setMaxWeight(calculateMaxWeight(thrusterForce, gravitationalAcceleration, stoppingDistance, startingSpeed))
	}, [thrusterForce, gravitationalAcceleration, stoppingDistance, startingSpeed])

	return (
		<div>
			<section>
				<label>
					Gravitational Acceleration (m/s^2):
					<input
						type="number"
						value={gravitationalAcceleration}
						onInput={(e) => {
							setGravitationalAcceleration(parseFloat(e.currentTarget.value) || 0)
						}}
					/>
				</label>
				<label>
					Stopping Distance (m):
					<input type="number"
						value={stoppingDistance}
						onInput={(e) => {
							setStoppingDistance(parseFloat(e.currentTarget.value) || 0)
						}}
					/>
				</label>
				<label>
					Starting Speed (m/s):
					<input type="number"
						value={startingSpeed}
						onInput={(e) => {
							setStartingSpeed(parseFloat(e.currentTarget.value) || 0)
						}}
					/>
				</label>
				<table>
					<thead>
						<tr>
							<th>Thruster Type</th>
							<th>Quantity</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">Atmospheric Thruster</th>
							<td><input type="number" value={sgAtmosCount} onInput={(e) => setSgAtmosCount(parseFloat(e.currentTarget.value) || 0)} /></td>
						</tr>
						<tr>
							<th scope="row">Large Atmospheric Thruster</th>
							<td><input type="number" value={sgLAtmosCount} onInput={(e) => setSgLAtmosCount(parseFloat(e.currentTarget.value) || 0)} /></td>
						</tr>
						<tr>
							<th scope="row">Flat Atmospheric Thruster</th>
							<td><input type="number" value={sgFlatmoCount} onInput={(e) => setSgFlatmoCount(parseFloat(e.currentTarget.value) || 0)} /></td>
						</tr>
						<tr>
							<th scope="row">Large Flat Atmospheric Thruster</th>
							<td><input type="number" value={sgLFlatmoCount} onInput={(e) => setSgLFlatmoCount(parseFloat(e.currentTarget.value) || 0)} /></td>
						</tr>
						<tr>
							<th scope="row">Ion Thruster</th>
							<td><input type="number" value={sgIonCount} onInput={(e) => setSgIonCount(parseFloat(e.currentTarget.value) || 0)} /></td>
						</tr>
						<tr>
							<th scope="row">Large Ion Thruster</th>
							<td><input type="number" value={sgLIonCount} onInput={(e) => setSgLIonCount(parseFloat(e.currentTarget.value) || 0)} /></td>
						</tr>
						<tr>
							<th scope="row">Hydrogen Thruster</th>
							<td><input type="number" value={sgHydrogenCount} onInput={(e) => setSgHydrogenCount(parseFloat(e.currentTarget.value) || 0)} /></td>
						</tr>
						<tr>
							<th scope="row">Large Hydrogen Thruster</th>
							<td><input type="number" value={sgLHydrogenCount} onInput={(e) => setSgLHydrogenCount(parseFloat(e.currentTarget.value) || 0)} /></td>
						</tr>
					</tbody>
				</table>
				<h2>Your max weight: {maxWeight}</h2>
			</section>
		</div>
	);
}

const calculateMaxWeight = (thrusterForce, gravitationalAcceleration, stoppingDistance, startingSpeed) => {
	const stoppingAcceleration = (startingSpeed ** 2) / (2 * stoppingDistance)
	const totalRequiredDeceleration = stoppingAcceleration + gravitationalAcceleration
	return thrusterForce / totalRequiredDeceleration
}

/* future improvements
 * safety factors
 * consider efficiencies based on altitude/atmosphere/power level (generic efficiency scaler?)
 * add large grid thrusters
 * consider different environemnts (atmos and space to account for ion and atmos efficiency)
 * make this a script for lcds in game
 */

render(<App />, document.getElementById('app'));
