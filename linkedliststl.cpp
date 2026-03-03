#include <iostream>
#include <list>
using namespace std;

int main() {
    list<int> l;
    int choice, value;

    do {
        cout << "\n---- LINKED LIST MENU ----\n";
        cout << "1. Insert at Front\n";
        cout << "2. Insert at Back\n";
        cout << "3. Delete from Front\n";
        cout << "4. Delete from Back\n";
        cout << "5. Display\n";
        cout << "6. Exit\n";
        cout << "Enter choice: ";
        cin >> choice;

        switch(choice) {

            case 1:
                cout << "Enter value: ";
                cin >> value;
                l.push_front(value);
                cout << value << " inserted at front.\n";
                break;

            case 2:
                cout << "Enter value: ";
                cin >> value;
                l.push_back(value);
                cout << value << " inserted at back.\n";
                break;

            case 3:
                if (l.empty()) {
                    cout << "List is empty.\n";
                } else {
                    cout << l.front() << " deleted from front.\n";
                    l.pop_front();
                }
                break;

            case 4:
                if (l.empty()) {
                    cout << "List is empty.\n";
                } else {
                    cout << l.back() << " deleted from back.\n";
                    l.pop_back();
                }
                break;

            case 5:
                if (l.empty()) {
                    cout << "List is empty.\n";
                } else {
                    cout << "\n--- Linked List Elements ---\n";
                    for (int x : l) {
                        cout << x << " ";
                    }
                    cout << endl;
                }
                break;

            case 6:
                cout << "Exiting...\n";
                break;

            default:
                cout << "Invalid choice!\n";
        }

    } while (choice != 6);

    return 0;
}