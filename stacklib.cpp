#include <iostream>
#include <stack>
using namespace std;
int main()
{
    stack <int> s;
    cout<< "Initial size: " << s.size() << endl;
    s.push(10);
    s.push(20); 
    s.push(30);
    s.push(40);
    if(s.empty())
        cout<< "Stack is empty\n";
    else
        cout<< "Stack is not empty\n";
    cout<< "Top element: " << s.top() << endl;
    cout<< "Popping top element: " << s.top() << endl;
    int x=s.top();
    s.pop();
    cout<< "Popped element: " << x << endl  ;
    cout<< "New size: " << s.size() << endl;
    
    int i=s.size();
    int j=1;
    for(j=1 ; j<=i; j++)
    {
        cout<<s.top()<<endl;
        s.pop();

    }
    }