/* eslint-disable */
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthResultType = {
  __typename?: 'AuthResultType';
  accessToken: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type AuthenticateInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticate: AuthResultType;
  register: UserType;
  requestPasswordReset: PasswordResetRequestResultType;
  resetPassword: Scalars['Boolean']['output'];
};


export type MutationAuthenticateArgs = {
  input: AuthenticateInput;
};


export type MutationRegisterArgs = {
  input: RegisterUserInput;
};


export type MutationRequestPasswordResetArgs = {
  input: RequestResetInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};

export type PasswordResetRequestResultType = {
  __typename?: 'PasswordResetRequestResultType';
  deliveryMode: Scalars['String']['output'];
  ok: Scalars['Boolean']['output'];
  resetUrlPreview?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<UserType>;
  me?: Maybe<UserType>;
  validateResetToken: Scalars['Boolean']['output'];
};


export type QueryGetUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryValidateResetTokenArgs = {
  token: Scalars['String']['input'];
};

export type RegisterUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RequestResetInput = {
  email: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type UserType = {
  __typename?: 'UserType';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
};

export type AuthenticateMutationVariables = Exact<{
  input: AuthenticateInput;
}>;


export type AuthenticateMutation = { __typename?: 'Mutation', authenticate: { __typename?: 'AuthResultType', accessToken: string, userId: string } };

export type RegisterMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserType', id: string, email: string, isActive: boolean } };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type RequestPasswordResetMutationVariables = Exact<{
  input: RequestResetInput;
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset: { __typename?: 'PasswordResetRequestResultType', ok: boolean, deliveryMode: string, resetUrlPreview?: string | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'UserType', id: string, email: string, isActive: boolean } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const AuthenticateDocument = new TypedDocumentString(`
    mutation authenticate($input: AuthenticateInput!) {
  authenticate(input: $input) {
    accessToken
    userId
  }
}
    `) as unknown as TypedDocumentString<AuthenticateMutation, AuthenticateMutationVariables>;
export const RegisterDocument = new TypedDocumentString(`
    mutation register($input: RegisterUserInput!) {
  register(input: $input) {
    id
    email
    isActive
  }
}
    `) as unknown as TypedDocumentString<RegisterMutation, RegisterMutationVariables>;
export const ResetPasswordDocument = new TypedDocumentString(`
    mutation resetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input)
}
    `) as unknown as TypedDocumentString<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const RequestPasswordResetDocument = new TypedDocumentString(`
    mutation requestPasswordReset($input: RequestResetInput!) {
  requestPasswordReset(input: $input) {
    ok
    deliveryMode
    resetUrlPreview
  }
}
    `) as unknown as TypedDocumentString<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>;
export const MeDocument = new TypedDocumentString(`
    query me {
  me {
    id
    email
    isActive
  }
}
    `) as unknown as TypedDocumentString<MeQuery, MeQueryVariables>;