import qiskit
import numpy

# starting setup
shared_bits = qiskit.quantum_info.Statevector([1, 0, 0, 1] / numpy.sqrt(2))
q = qiskit.quantum_info.Statevector([3/5, 4/5])
# q = qiskit.quantum_info.Statevector([1, 0])

# put in one large state
state = shared_bits.tensor(q)
print(state)

# sender circuit
to_classical = qiskit.circuit.QuantumCircuit(3)
to_classical.cx(0, 1)
to_classical.h(0)
state = state.evolve(to_classical)

# measurement
measurements, state = state.measure([0, 1])
print(measurements)
print(state)

# receiver circuit
receiver = qiskit.circuit.QuantumCircuit(3)
if measurements[1] == "1":
  receiver.z(2)
if measurements[0] == "1":
  receiver.x(2)
state = state.evolve(receiver)

# final state
print(state)