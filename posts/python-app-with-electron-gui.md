createdOn 2018-04-16T10:50Z
# Python App with Web Browser GUI or Electron GUI

### Motivation
I have been using Python as my primary programming language for a few years. With Numpy and Pandas libraries, Python has been great for numerical analysis and big data manipulation. From time to time I found myself developing GUI for Python app to make it more user friendly, for myself, and/or my peers. I had used [TkInter](https://wiki.python.org/moin/TkInter) and [wxPython](https://wxpython.org/). TkInter comes together with the basic installation of Python while wxPython requires installation. Both of them are cross-platform. They have been great and I had used them to create a number of GUIs.

One major downside that I found is the display of graph. I use [Matplotlib](https://matplotlib.org/) for graphs plotting. It produces professional looking graphs. However, there are cases where I need to embed graphs in the GUI. This often causes problems in TkInter and wxPython. A scrollable canvas need to be created if you want to have a display longer than your screen height. Graphs are difficult to format properly when it's embedded and sometimes some hacks are required to show the graph the way you want. Bla bla bla...

Web technology has evolved so much that HTML, CSS, and Javascript combined provide us a simple platform to create a pretty user interface. There are also many framework and libraries to provide graph plotting function and UI enhancement. And more importantly, they are easy to learn.

### Solution

One way of doing this would be to create the Python app, and use [Flask](http://flask.pocoo.org/) to provide the interface to the Python app. By doing this, one can access the UI through web browser. However, I would like to take it further: to create a standalone desktop application. By using Electron, which is basically a stripped web browser, I will be able to start the Python Flask app as a server and launch Electron to display the UI, which would be essentially a standalone desktop application.

Also, I would like the Python app to be independent of Electron. That means, before I compiled all of them together, I can run the Python Flask app and use browser to interact with the application. Also, the Python app functions should be independent of the Flask app as well, i.e. the Python app function can be used as it is if I do not wish to have an interface.

So in summary, this is what I would achieve through this exercise:

1. A Python application
2. A Flask application
3. A desktop application using Electron

The application with lower number does not depend on the ones of higher number.

### Directory tree

The organisation of the directories doesn't matter that much but mainly to make it clearer and cleaner. The directory tree that I suggest is as follows:

```
main-directory
|-- electron-app
|-- flask-app
|-- pythonApp
```

One remark on the naming of the Python application directory. No dash should be used in the directory name as this will prevent it to be used as a Python module.

### Python application

So, let's start with a simple Python application called `textManipulator`. Create a file called `textManipulator.py` in `pythonApp` directory. Copy the following codes into the `textManipulator.py`.

```
class textManipulator():
  def __init__(text=""):
    self.text = text

  def reverse():
    return self.text[::-1]

  def addStrAt(string, n):
    return self.text[:n] + string + self.text[n:]
```

The `textManipulator` class can be used to reverse a string and add substring at a defined position.

For the purpose of using this in a command line interface, add `import sys` to the top of the file, and add

```
if __name__ == "__main__":
  if len(sys.argv) > 1:
    tm = textManipulator(sys.argv[1])
    if len(sys.argv) > 2:
      if sys.argv[2] == "reverse":
        print tm.reverse()
      elif sys.argv[2] == "addStrAt":
        if len(sys.argv) < 5:
          raise Exception("Wrong syntax")
        else:
          print tm.addStrAt(sys.argv[3], int(sys.argv[4]))
```

to the bottom of the file. This part of the code only execute if the file is executed as script, for example calling `python textManipulator.py` in a terminal.

The command line usage of this Python app is as follows:

    python textManipulator.py 123 reverse
    // expected output: 321

or
    
    python textManipulator.py 123 addStrAt abc 2
    // expected output: 12abc3

If you have no intention of using the Python app in command line, you can skip the addition of `import sys` and the codes at the bottom of the file.

The final code of this file is:

```
import sys

class textManipulator():
  def __init__(self, text=""):
    self.text = text

  def reverse(self):
    return self.text[::-1]

  def addStrAt(self, string, n):
    return self.text[:n] + string + self.text[n:]

if __name__ == "__main__":
  if len(sys.argv) > 1:
    tm = textManipulator(sys.argv[1])
    if len(sys.argv) > 2:
      if sys.argv[2] == "reverse":
        print tm.reverse()
      elif sys.argv[2] == "addStrAt":
        if len(sys.argv) < 5:
          raise Exception("Wrong syntax")
        else:
          print tm.addStrAt(sys.argv[3], int(sys.argv[4]))
```

Directory tree at this stage:

```
main-directory
|-- electron-app
|-- flask-app
|-- pythonApp
    |-- textManipulator.py
```

### Flask application

I will present a simple Flask application serves as the API for the Python application we developed previously. If you are interested in more complicated usage, you can go to the [official website](http://flask.pocoo.org/).

Before we start, you need to install `Flask`. It is as simple as `pip install Flask`. 

Create a file called `main.py` in the `flask-app` directory. Paste the following code in the file:

```
from ..pythonApp.textManipulator import textManipulator
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
  return "Hello World, {}".format(sys.prefix)
```