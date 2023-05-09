import { createParamDecorator, ExecutionContext, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../guards/interfaces';
import { User } from 'src/user/entities/user.entity';

export const CurrentUserGql = createParamDecorator(
    ( roles: ValidRoles[] = [], context: ExecutionContext ) => {

        //una vez pasamos el validate de jwt.strategy  tenemos el user

        const ctx = GqlExecutionContext.create( context )
        const user: User = ctx.getContext().req.user;

        if ( !user ) {
            throw new InternalServerErrorException(`No user inside the request - make sure that we used the AuthGuard`)
        }


        if ( roles.length === 0 ) return user;

        for ( const role of user.roles ) {
            //TODO: Eliminar Valid Roles
            if ( roles.includes( role as ValidRoles ) ) {
                return user;
            }
        }

        throw new ForbiddenException(
            `User ${ user.pnombre } need a valid role [${ roles }]`
        )

})