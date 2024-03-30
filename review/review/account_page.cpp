#include "headers.h"
#include<bits/stdc++.h>
using namespace std;
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
    //db obj;
    User new_user;
    cout<<"Enter your name\n";
    cin>>new_user.name;
    cout<<"Enter your email id\n";
    cin>>new_user.mailID;
    cout<<"Enter your gender\n";
    cin>>new_user.gender;
    cout<<"Enter your address\n";
    cin.ignore();
    getline(cin,new_user.address);
    cout<<"Enter your contact number\n";
    cin>>new_user.phoneNumber;
    cout<<"Enter your age\n";
    cin>>new_user.age;
    cout<<"Enter your pasword\n";
    cin>>new_user.password;
    cout<<"Confirm by reentering your password\n";
    string confirmation;
    do{
        
        cin>>confirmation;
        if(confirmation!=new_user.password){
            cout<<"passowrd didn't match\n";
            cout<<"re-enter your password\n";
        }
    }while(confirmation!=new_user.password);

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

    new_user.Userpreference= new preference(preferred_gender,preferred_age,size,color);
    obj.insertuser(new_user);
    cout<<"your details:\n";
    cout<<obj.allUsers[0].name<<endl;
    cout<<obj.allUsers[0].mailID<<endl;
    cout<<obj.allUsers[0].gender<<endl;
    cout<<obj.allUsers[0].address<<endl;
    cout<<obj.allUsers[0].phoneNumber<<endl;
    cout<<obj.allUsers[0].name<<endl;

}
void Create_Account::Create_designer(){
    cout<<"Designer created succesfully\n";
}
