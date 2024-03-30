#include "headers.h"
#include "userModule.h"
#include<bits/stdc++.h>
using namespace std;
class User;
class order;
 Create_Account::Create_Account(){
        cout<<"Enter 1 to create a user account\n";
        cout<<"Enter 2 to create a designer account\n";
        cout<<"Enter 3 to go to start page\n";
        cin>>choice;
        do{
            switch(choice){
            case 1:{
                Create_User();
                break;
            }
            case 2:{
                Create_designer();
                break;
            }
            case 3:{
                start_page obj;
                break;
            }
            default:{
                cout<<"Enter a correct value";
                break;
            }
        }
        }while(choice>3);
    }
void Create_Account::Create_User(){
    cout<<"Enter your name\n";
    cin>>name;
    cout<<"Enter your email id\n";
    cin>>mailID;
    cout<<"Enter your gender\n";
    cin>>gender;
    cout<<"Enter your address\n";
    //getline(cin,address);
    cin>>address;
    cout<<"Enter your contact number\n";
    cin>>phoneNumber;
    cout<<"Enter your age\n";
    cin>>age;
    cout<<"Enter your pasword\n";
    cin>>password;
    cout<<"Confirm by reentering your password\n";
    string confirmation;
    do{
        
        cin>>confirmation;
        if(confirmation!=password){
            cout<<"passowrd didn't match\n";
            cout<<"re-enter your password\n";
        }
    }while(confirmation!=password);

    cout<<"Enter your preferrences\n";
    string size,color,preferred_gender;
    int preferred_age;
    cout<<"Enter your size\n";
    cin>>size;
    cout<<"Enter your  age\n";
    cin>>preferred_age;
    cout<<"Enter your  gender\n";
    cin>>preferred_gender;
    cout<<"Enter the color you like color\n";
    cin>>color;

    preference *user_preference= new preference(gender,age,size,color);
    
}
void Create_Account::Create_designer(){
    cout<<"Designer created succesfully\n";
}
