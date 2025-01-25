import tensorflow as tf

# Load the TFLite model and allocate tensors.
interpreter = tf.lite.Interpreter(model_path="model.tflite")

# Disable the XNNPACK delegate
interpreter._experimental_disable_delegate("XNNPACK")

# Allocate tensors.
interpreter.allocate_tensors()

# Get input and output tensors.
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# ...rest of your code...