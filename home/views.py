from django.shortcuts import render

codeinfo = [
{
	"name": "Variables",
	"des": """Variables are used to store data. The main variables that you are gonna be using are listed below.
		str (string/text) e.x. "hello", "hi there"
		int (intergers/whole numbers) e.x. 4, 7, 10
		float (floating-point/decimal) e.x. 1.25, 5.6, 0.02
		bool (boolean/true or false) e.x. True, False

To define a variable use the equal sign "=" with the name of the variable to the left and the value to the right. You can change the name of the variable to almost anything, but you should name the variable of what data it contains. Below are some examples of asigning variables.""",
	"examples": [
	"""
greetingtext = "Hello There"
	""",
	"""
wholenumber = 512
	""",
	"""
learnpython = True
	"""
	]
},
{
	"name": "print()",
	"des": "Pass a string, number, or a variable to it to display the information in the program output.",
	"examples": [
	"""
print("Hello World")

> Hello World
	""",
	"""
print(1 + 1)

> 2
	""",
	"""
greeting = "Hello Friend"
print(greeting)

> Hello Friend
	"""
	]
},
{
	"name": "input()",
	"des": "It first prints any text passed to it, then it will wait for a user input and return the input from the user.",
	"examples": [
	"""
userinput = input("Whats your name : ")
print(userinput)

> Whats your name : niko
> niko
	""",
	"""
nameofuser = input("What is your name? ")
print("Hello " + nameofuser)

> What is your name? theo
> Hello theo
	""",
	"""
favcolor = input("Whats your fav color? ")
print("My favorite color is also " + favcolor)

> Whats your fav color? green
> My favorite color is also green
	"""
	]
},
{
	"name": "If Statement",
	"des": "If the condition is true it will run the codeblock under it. Use the else keyword to have a trigger if the if statement is false.",
	"examples": [
	"""
runcode = True
if runcode:
	print("Code is running")

> Code is running
	""",
	"""
name = input("What's your name? ")
if name == "niko":
	print("Hi Niko")
else:
	print("Hello " + name)

> Whats your name? niko
> Hi Niko
	""",
	"""
answer = 3
usrinput = input("What's 1 + 2? ")
if usrinput == str(answer):
	print("Correct")
else:
	print("Incorrect")

> Whats 1 + 2? 4
> Incorrect
	"""
	]
},
{
	"name": "Lists",
	"des": "A list is a type of data that contains more data in a list form. You can create a list by using [] and data in the list seperated by a comma. You can choose what item you want in the list by using listvar[index] where index is the item number from the list you want, starting from 0 as the first item.",
	"examples": [
	"""
carbrands = ["jeep", "ford", "chevrolet"]
print(carlist[0])

> jeep
	""",
	"""
dogtypes = ["Golden Retriever", "Yorkshire Terrier", "Corgi"]
print(dogtypes[-1])

> Corgi
	""",
	"""
numbers = [3, 1, 4]
print(numbers)

> [3, 1, 4]
	"""
	]
},
{
	"name": "For Loops",
	"des": "For loops can be used to loop over a list.",
	"examples": [
	"""
rubixcubes = ["2x2", "3x3", "4x4"]

for cube in rubixcubes:
	print(cube)

> 2x2
> 3x3
> 4x4
	""",
	"""
linuxos = ["Kali", "Ubuntu", "ParrotOS"]
for os in linuxos:
	print(os + " works on linux")

> Kali works on linux
> Ubuntu works on linux
> ParrotOS works on linux
	""",
	"""
# range() generates a list with the numbers 
# between the range provided.
for index in range(0, 3):
	print(index)

> 0
> 1
> 2
	"""
	]
},
{
	"name": "While Loop",
	"des": "While loops will keep running the code until the condition is false",
	"examples": [
	"""
running = True
while running:
	print(running)

> True
> True
> True
...
	""",
	"""
loopon = True
while loopon:
	print("Loop Is On")
	break

> Loop Is On
	""",
	"""
startloop = True
while startloop:
	print("Loop Started")
	startloop = False

print("Loop Ended")

> Loop Started
> Loop Ended
	"""
	]
}
]


def home(request):
	return render(request, 'home/home.html')


def projects(request):
	return render(request, 'home/projects.html', {'title': 'Projects by Niko'})


def coding(request):
	return render(request, 'home/coding.html', {'title': 'Python Coding Guide by Niko', 'codeinfo': codeinfo})


def pythonide(request):
	return render(request, 'home/pythonide.html', {'title': 'Python Interpreter'})


def kingdom(request):
	return render(request, 'home/kingdom.html', {'title': 'Cure The Kingdom Tech Demo by Niko'})


def blenderrender(request):
	return render(request, 'home/blenderrender.html', {'title': 'Blender Renders by Niko'})


def about(request):
	return render(request, 'home/about.html', {'title': 'About'})
