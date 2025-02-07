import React from 'react';
import InputBox from '../components/input.component';

export default function AuthForm({ type }) {
    return (
        <section className='h-cover flex items-center justify-center'>
            <form className='w-[80%] max-w-[400px]'>
                <h1 className='text-4xl font-gelasio capitalize text-center mb-24'>
                    {type == 'sign-in'
                        ? 'Welcome Back'
                        : 'join us now'}
                </h1>

                {type != 'sign-in' ? (
                    <InputBox
                        type='fullname'
                        placeholder='Your Name'
                        name='fullname'
                        icon='fi-rr-user'
                    />
                ) : (
                    ''
                )}

                <InputBox
                    type='email'
                    placeholder='Your Email'
                    name='email'
                    icon='fi-rr-envelope'
                />
                <InputBox
                    type='password'
                    placeholder='Password'
                    name='password'
                    icon='fi-rr-key'
                />
            </form>
        </section>
    );
}
