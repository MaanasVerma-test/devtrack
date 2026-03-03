#include <iostream>
using namespace std;

class Stack {
private:
    int *arr;
    int top;
    int capacity;

public:
    // Constructor
    Stack(int size) {
        capacity = size;
        arr = new int[capacity];
        top = -1;
    }

    // Destructor
    ~Stack() {
        delete[] arr;
    }

    // Push operation
    void push(int x) {
        if (isFull()) {
            cout << "Stack Overflow! Cannot push " << x << endl;
            return;
        }
        arr[++top] = x;
        cout << x << " pushed into stack\n";
    }

    // Pop operation
    void pop() {
        if (isEmpty()) {
            cout << "Stack Underflow! Cannot pop.\n";
            return;
        }
        cout << arr[top--] << " popped from stack\n";
    }

    // Peek operation
    int peek() {
        if (isEmpty()) {
            cout << "Stack is empty.\n";
            return -1;
        }
        return arr[top];
    }

    // Check if empty
    bool isEmpty() {
        return (top == -1);
    }

    // Check if full
    bool isFull() {
        return (top == capacity - 1);
    }

    // Display stack
    void display() {
        if (isEmpty()) {
            cout << "Stack is empty.\n";
            return;
        }

        cout << "Stack elements (top to bottom):\n";
        for (int i = top; i >= 0; i--) {
            cout << arr[i] << endl;
        }
    }
};

int main() {
    int size, choice, value;

    cout << "Enter stack size: ";
    cin >> size;

    Stack s(size);

    do {
        cout << "\n---- Stack Menu ----\n";
        cout << "1. Push\n";
        cout << "2. Pop\n";
        cout << "3. Peek\n";
        cout << "4. Display\n";
        cout << "5. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                cout << "Enter value to push: ";
                cin >> value;
                s.push(value);
                break;

            case 2:
                s.pop();
                break;

            case 3:
                cout << "Top element: " << s.peek() << endl;
                break;

            case 4:
                s.display();
                break;

            case 5:
                cout << "Exiting program.\n";
                break;

            default:
                cout << "Invalid choice!\n";
        }

    } while (choice != 5);

    return 0;
}