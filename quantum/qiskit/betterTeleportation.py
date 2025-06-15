import bluequbit
import qiskit
from qiskit_aer import AerSimulator
import numpy
import os

# get api key
file_location = os.path.join(os.path.dirname(__file__), "..", "..", "secrets", "bluequbitAPI.txt")
with open(file_location, "r") as file:
  api_key = file.read()
print(api_key)

# teleportation my beloved
bits = [
  qiskit.circuit.Qubit(), qiskit.circuit.Qubit(), qiskit.circuit.Qubit(),
  qiskit.circuit.Clbit(), qiskit.circuit.Clbit(), qiskit.circuit.Clbit(),
]
quantum_circuit = qiskit.QuantumCircuit(bits)

# bell state
quantum_circuit.h(1)
quantum_circuit.cx(1, 2)

# initial qubit state
quantum_circuit.h(0)
quantum_circuit.t(0)
quantum_circuit.h(0)

# sender circuit
quantum_circuit.cx(0, 1)
quantum_circuit.h(0)

quantum_circuit.measure(0, 0)
quantum_circuit.measure(1, 1)

with quantum_circuit.if_test((bits[4], 1)):
  quantum_circuit.x(2)
with quantum_circuit.if_test((bits[3], 1)):
  quantum_circuit.z(2)

# quantum_circuit.x(2).c_if(bits[4], 1)
# quantum_circuit.z(2).c_if(bits[3], 1)

quantum_circuit.measure(2, 2)

print(quantum_circuit)

# run the circuit
executor = "aersim"
shots = 1000

if (executor == "aersim"):
  simulator = AerSimulator()
  compiled = qiskit.transpile(quantum_circuit, simulator)
  result = simulator.run(compiled, shots=shots).result()
elif (executor == "bluequbit"):
  # create a bluequbit client
  
  # doesn't work
  # QiskitError: "OpenQASM 2 cannot represent 'if_else', which acts on 1 classical bits."
  
  bq = bluequbit.init(api_key)
  result = bq.run(quantum_circuit, shots=shots)

counts = result.get_counts()
print(counts)

# collect results
classical_data = {
  "0": 0,
  "1": 0
}
for key in counts:
  classical_data[key[0]] += counts[key]

# print the results
print(classical_data)

# with q0--HTH-- it becomes 14.6% chance of 1