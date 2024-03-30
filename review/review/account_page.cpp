#include "headers.h"
#include<bits/stdc++.h>
using namespace std;
class order;
db user_obj,designer_obj;
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
                start_page user_obj;
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
    //db user_obj;
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
    new_user.id=++userCount;
    new_user.Userpreference= new preference(preferred_gender,preferred_age,size,color);
    user_obj.insertuser(new_user);
    int a;
    cout<<"to go to login page enter 1\n";
    cin>>a;
    if(a==1){ Login_Account cur_user;}

}
void Create_Account::Create_designer(){
    designer new_designer;
      cout<<"Enter your name\n";
    cin>>new_designer.name;
    cout<<"Enter your email id\n";
    cin>>new_designer.mailID;
    cout<<"Enter your gender\n";
    cin>>new_designer.gender;
    cout<<"Enter your address\n";
    cin.ignore();
    getline(cin,new_designer.address);
    cout<<"Enter your contact number\n";
    cin>>new_designer.contactNumber;
    cout<<"Enter your age\n";
    cin>>new_designer.age;
    cout<<"Enter your pasword\n";
    cin>>new_designer.password;
    cout<<"Confirm by reentering your password\n";
    string confirmation;
    do{
        
        cin>>confirmation;
        if(confirmation!=new_designer.password){
            cout<<"passowrd didn't match\n";
            cout<<"re-enter your password\n";
        }
    }while(confirmation!=new_designer.password);
    new_designer.id=++designerCount;
       designer_obj.allDesigners.push_back(new_designer); 
   int a;
    cout<<"to go to login page enter 1\n";
    cin>>a;
    if(a==1){ Login_Account cur_user;}
       
}

Login_Account::Login_Account(){
    int choice;
    cout<<"If you are a user ,press 1\n";
    cout<<"If you are a designer press 2\n";
    cin>>choice;
    if(choice==1){
        string name,password;
        do{
            cout<<"Enter your username and password\n";
            cin>>name>>password;
            if(check_user_details(name,password)==0){
                cout<<"welcome "<<name<<endl;
                break;
            }
            else if(check_user_details(name,password)==2){
                int options;
                cout<<"An account with username doesnot exist"<<endl;
                cout<<"To re-enter your credentials press 1"<<endl;
                cout<<"To exit press any other digit"<<endl;
                cin>>options;
                if(options==1) continue;
                else  break;
            }
            else{
                cout<<"WRONG PASSWORD!\n";
                cout<<"Re-enter your name ans password\n";
                continue;
            }
        }while(1);
    }
    else{
        string name,password;
        do{
            cout<<"Enter your username and password\n";
            cin>>name>>password;
            if(check_user_details(name,password)==0){
                cout<<"welcome "<<name<<endl;
                break;
            }
            else if(check_user_details(name,password)==2){
                int options;
                cout<<"An account with username doesnot exist"<<endl;
                cout<<"To re-enter your credentials press 1"<<endl;
                cout<<"To exit press any other digit"<<endl;
                cin>>options;
                if(options==1) continue;
                else  break;
            }
            else{
                cout<<"WRONG PASSWORD!\n";
                cout<<"Re-enter your name ans password\n";
                continue;
            }
        }while(1);
        
    }
    
    
}
